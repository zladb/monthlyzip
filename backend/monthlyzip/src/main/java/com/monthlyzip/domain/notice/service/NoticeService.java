package com.monthlyzip.domain.notice.service;

import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.domain.notice.model.dto.request.NoticeRequestDto;
import com.monthlyzip.domain.notice.model.dto.request.NoticeUpdateRequestDto;
import com.monthlyzip.domain.notice.model.dto.response.NoticeResponseDto;
import com.monthlyzip.domain.notice.model.entity.Notice;
import com.monthlyzip.domain.notice.repository.NoticeRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final BuildingRepository buildingRepository;
    private final ContractRepository contractRepository;

    public NoticeResponseDto createNotice(NoticeRequestDto requestDto, Member landlord) {
        Building building = buildingRepository.findById(requestDto.getBuildingId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        // ✅ 건물의 소유주가 현재 로그인한 landlord인지 확인
        if (!building.getOwner().getId().equals(landlord.getId())) {
            throw new BusinessException(ApiResponseStatus.NOTICE_NO_AUTHORITY);
        }

        Notice notice = Notice.builder()
                .landlord(landlord)
                .building(building)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        noticeRepository.save(notice);
        return NoticeResponseDto.of(notice);
    }

    private Building findTenantBuilding(Member tenant) {
        Contract contract = contractRepository.findLatestByTenantId(tenant.getId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        return contract.getRoom().getBuilding();
    }


    public List<NoticeResponseDto> getNotices(Long buildingId, Member member) {
        // ✅ buildingId가 전달되면 해당 건물 공지사항만 조회
        if (buildingId != null) {
            if (!buildingRepository.existsById(buildingId)) {
                throw new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND);
            }

            return noticeRepository.findByBuildingId(buildingId)
                    .stream()
                    .map(NoticeResponseDto::of)
                    .collect(Collectors.toList());
        }

        // ✅ buildingId 없을 때 유저 타입 기준으로 분기
        if (member.isLandlord()) {
            List<Long> ownedBuildingIds = buildingRepository.findByOwnerId(member.getId())
                    .stream()
                    .map(Building::getId)
                    .toList();

            return noticeRepository.findByBuildingIdIn(ownedBuildingIds)
                    .stream()
                    .map(NoticeResponseDto::of)
                    .collect(Collectors.toList());
        }

        if (member.isTenant()) {
            Building tenantBuilding = findTenantBuilding(member);
            return noticeRepository.findByBuildingId(tenantBuilding.getId())
                    .stream()
                    .map(NoticeResponseDto::of)
                    .collect(Collectors.toList());
        }

        throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
    }


    public NoticeResponseDto getNoticeById(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.NOTICE_NOT_FOUND));

        return NoticeResponseDto.of(notice);
    }

    @Transactional
    public NoticeResponseDto updateNotice(Long noticeId, NoticeUpdateRequestDto requestDto) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.NOTICE_NOT_FOUND));

        notice.update(requestDto.getTitle(), requestDto.getContent());
        return NoticeResponseDto.of(notice);
    }

    @Transactional
    public void deleteNotice(Long noticeId) {
        if (!noticeRepository.existsById(noticeId)) {
            throw new BusinessException(ApiResponseStatus.NOTICE_NOT_FOUND);
        }

        noticeRepository.deleteById(noticeId);
    }
}
