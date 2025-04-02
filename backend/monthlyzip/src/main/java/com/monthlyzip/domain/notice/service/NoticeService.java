package com.monthlyzip.domain.notice.service;

import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
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
    private final MemberRepository memberRepository;
    private final BuildingRepository buildingRepository;

    public NoticeResponseDto createNotice(NoticeRequestDto requestDto) {
        Member landlord = memberRepository.findById(requestDto.getLandlordId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        Building building = buildingRepository.findById(requestDto.getBuildingId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        Notice notice = Notice.builder()
                .landlord(landlord)
                .building(building)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        noticeRepository.save(notice);
        return NoticeResponseDto.of(notice);
    }

    public List<NoticeResponseDto> getNoticesByBuilding(Long buildingId) {
        if (!buildingRepository.existsById(buildingId)) {
            throw new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND);
        }

        return noticeRepository.findByBuildingId(buildingId)
                .stream()
                .map(NoticeResponseDto::of)
                .collect(Collectors.toList());
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
