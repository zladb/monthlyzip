package com.monthlyzip.domain.building.service;

import com.monthlyzip.domain.building.model.dto.request.BuildingRequestDto;
import com.monthlyzip.domain.building.model.dto.request.BuildingUpdateRequestDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingDetailResponseDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingResponseDto;
import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
<<<<<<< HEAD
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.member.model.entity.Member;
import com.monthlyzip.member.repository.MemberRepository;
=======
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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

<<<<<<< HEAD
        if (ownerId != null) {
            log.info("특정 소유자의 건물 조회");

            boolean ownerExists = memberRepository.existsById(ownerId);
            if (!ownerExists) {
                throw new BusinessException(ApiResponseStatus.OWNER_NOT_FOUND);
            }

            buildings = buildingRepository.findByOwnerId(ownerId);
        } else {
            log.info("전체 건물 조회 요청");
            buildings = buildingRepository.findAll();
        }

=======
        log.info("특정 소유자의 건물 조회");

        boolean ownerExists = memberRepository.existsById(ownerId);
        if (!ownerExists) {
            throw new BusinessException(ApiResponseStatus.OWNER_NOT_FOUND);
        }

        buildings = buildingRepository.findByOwnerId(ownerId);

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        return buildings.stream()
                .map(BuildingResponseDto::of)
                .collect(Collectors.toList());
    }

<<<<<<< HEAD
    public BuildingResponseDto createBuilding(BuildingRequestDto requestDto) {
        Member owner = memberRepository.findById(requestDto.getOwnerId())
=======
    public BuildingResponseDto createBuilding(Long ownerId, BuildingRequestDto requestDto) {
        Member owner = memberRepository.findById(ownerId)
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
    public BuildingResponseDto updateBuilding(Long buildingId, BuildingUpdateRequestDto requestDto) {
=======
    public BuildingResponseDto updateBuilding(Long buildingId, Long ownerId, BuildingUpdateRequestDto requestDto) {
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        log.info("건물 정보 수정 실행");

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

<<<<<<< HEAD
=======
        if (!building.getOwner().getId().equals(ownerId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED); // 권한 없음 에러 처리
        }

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
    public void deleteBuilding(Long buildingId) {
        log.info("건물 삭제");

        if (!buildingRepository.existsById(buildingId)) {
            throw new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND);
        }

        buildingRepository.deleteById(buildingId);
=======
    public void deleteBuilding(Long buildingId, Long ownerId) {
        log.info("건물 삭제");

        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        if (!building.getOwner().getId().equals(ownerId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED); // 권한 없음 에러 처리
        }

        buildingRepository.delete(building);
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        log.info("건물 삭제 완료");
    }
}
