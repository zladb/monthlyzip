package com.monthlyzip.domain.building.service;

import com.monthlyzip.domain.building.model.dto.request.BuildingRequestDto;
import com.monthlyzip.domain.building.model.dto.request.BuildingUpdateRequestDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingDetailResponseDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingResponseDto;
import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
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
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final MemberRepository memberRepository;

    public BuildingDetailResponseDto getBuildingById(Long buildingId) {
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));
        return BuildingDetailResponseDto.of(building);
    }

    public List<BuildingResponseDto> getBuildings(Long ownerId) {
        List<Building> buildings;

        log.info("특정 소유자의 건물 조회");

        boolean ownerExists = memberRepository.existsById(ownerId);
        if (!ownerExists) {
            throw new BusinessException(ApiResponseStatus.OWNER_NOT_FOUND);
        }

        buildings = buildingRepository.findByOwnerId(ownerId);

        return buildings.stream()
                .map(BuildingResponseDto::of)
                .collect(Collectors.toList());
    }

    public BuildingResponseDto createBuilding(Long ownerId, BuildingRequestDto requestDto) {
        Member owner = memberRepository.findById(ownerId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.OWNER_NOT_FOUND));

        Building building = Building.builder()
                .owner(owner)
                .address(requestDto.getAddress())
                .buildingName(requestDto.getBuildingName())
                .build();

        buildingRepository.save(building);
        return BuildingResponseDto.of(building);
    }

    @Transactional
    public BuildingResponseDto updateBuilding(Long buildingId, Long ownerId, BuildingUpdateRequestDto requestDto) {
        log.info("건물 정보 수정 실행");

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        if (!building.getOwner().getId().equals(ownerId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED); // 권한 없음 에러 처리
        }

        boolean isUpdated = false;

        if (requestDto.getAddress() != null) {
            building.setAddress(requestDto.getAddress());
            isUpdated = true;
        }

        if (requestDto.getBuildingName() != null) {
            building.setBuildingName(requestDto.getBuildingName());
            isUpdated = true;
        }

        if (isUpdated) {
            log.info("건물 정보 수정 완료");
        } else {
            log.info("변경 사항이 없어 업데이트하지 않음");
        }

        return BuildingResponseDto.of(building);
    }

    @Transactional
    public void deleteBuilding(Long buildingId, Long ownerId) {
        log.info("건물 삭제");

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        if (!building.getOwner().getId().equals(ownerId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED); // 권한 없음 에러 처리
        }

        buildingRepository.delete(building);
        log.info("건물 삭제 완료");
    }
}
