package com.monthlyzip.building.service;

import com.monthlyzip.building.model.dto.request.BuildingRequestDto;
import com.monthlyzip.building.model.dto.request.BuildingUpdateRequestDto;
import com.monthlyzip.building.model.dto.response.BuildingDetailResponseDto;
import com.monthlyzip.building.model.dto.response.BuildingResponseDto;
import com.monthlyzip.building.model.entity.Building;
import com.monthlyzip.building.repository.BuildingRepository;
import com.monthlyzip.member.model.entity.Member;
import com.monthlyzip.member.repository.MemberRepository;
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
                .orElseThrow(() -> new IllegalArgumentException("해당 Building이 존재하지 않습니다. ID: "+ buildingId));

        return BuildingDetailResponseDto.of(building);
    }

    public List<BuildingResponseDto> getBuildings(Long ownerId) {
        List<Building> buildings;

        if (ownerId != null) {
            log.info("특정 소유자의 건물 조회");

            boolean ownerExists = memberRepository.existsById(ownerId);
            if (!ownerExists) {
                throw new IllegalArgumentException("해당 owner가 존재하지 않습니다. ID: " + ownerId);
            }

            buildings = buildingRepository.findByOwnerId(ownerId);
        } else {
            log.info("전체 건물 조회 요청");
            buildings = buildingRepository.findAll();
        }

        return buildings.stream()
                .map(BuildingResponseDto::of)
                .collect(Collectors.toList());
    }

    public BuildingResponseDto createBuilding(BuildingRequestDto requestDto) {
        Member owner = memberRepository.findById(requestDto.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("해당 owner가 존재하지 않습니다. ID: " + requestDto.getOwnerId()));

        Building building = Building.builder()
                .owner(owner)
                .address(requestDto.getAddress())
                .buildingName(requestDto.getBuildingName())
                .build();

        buildingRepository.save(building);
        return BuildingResponseDto.of(building);
    }

    @Transactional
    public BuildingResponseDto updateBuilding(Long buildingId, BuildingUpdateRequestDto requestDto) {
        log.info("건물 정보 수정 실행");

        // ✅ 1. 건물 엔티티 조회
        Building building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new IllegalArgumentException("해당 건물이 존재하지 않습니다. ID: " + buildingId));

        boolean isUpdated = false;

        // ✅ 2. 값이 변경된 경우에만 업데이트
        if (requestDto.getAddress() != null) {
            building.setAddress(requestDto.getAddress());
            isUpdated = true;
        }
        if (requestDto.getBuildingName() != null) {
            building.setBuildingName(requestDto.getBuildingName());
            isUpdated = true;
        }

        // ✅ 3. 변경된 경우에만 save() 호출하여 updatedAt 자동 갱신 보장
        if (isUpdated) {
//            buildingRepository.save(building);  // ✅ 반드시 save() 호출하여 @UpdateTimestamp 적용 보장
            log.info("건물 정보 수정 완료");
        } else {
            log.info("변경 사항이 없어 업데이트하지 않음");
        }

        // ✅ 4. 업데이트된 엔티티를 DTO로 변환하여 응답 반환
        return BuildingResponseDto.of(building);
    }

    @Transactional
    public void deleteBuilding(Long buildingId) {
        log.info("건물 삭제");

        if (!buildingRepository.existsById(buildingId)) {
            throw new IllegalArgumentException("해당 건물이 존재하지 않습니다. ID: " + buildingId);
        }

        buildingRepository.deleteById(buildingId);
        log.info("건물 삭제 완료");
    }
}