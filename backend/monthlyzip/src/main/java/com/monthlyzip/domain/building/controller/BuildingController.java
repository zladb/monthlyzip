package com.monthlyzip.domain.building.controller;

import com.monthlyzip.domain.building.model.dto.request.BuildingRequestDto;
import com.monthlyzip.domain.building.model.dto.request.BuildingUpdateRequestDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingDetailResponseDto;
import com.monthlyzip.domain.building.model.dto.response.BuildingResponseDto;
import com.monthlyzip.domain.building.service.BuildingService;
import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/building")
@RequiredArgsConstructor
public class BuildingController {
    private final BuildingService buildingService;

    // ✅ 건물 상세 조회 API
    @GetMapping("/{building_id}")
    public ApiResponse<BuildingDetailResponseDto> getBuildingById(
            @PathVariable("building_id") Long buildingId) {
        log.debug("건물 상세 조회 요청");
        return ApiResponse.success(buildingService.getBuildingById(buildingId));
    }

    // ✅ 건물 목록 조회 (소유자 ID는 토큰에서 추출)
    @GetMapping
    public ApiResponse<List<BuildingResponseDto>> getBuildings(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.debug("건물 목록 조회 요청");
        Long ownerId = userDetails.getMember().getId();
        return ApiResponse.success(buildingService.getBuildings(ownerId));
    }

    // ✅ 건물 정보 등록 (토큰 기반 ownerId 사용)
    @PostMapping
    public ApiResponse<BuildingResponseDto> createBuilding(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid BuildingRequestDto requestDto
    ){
        log.debug("건물 생성 요청");
        Long ownerId = userDetails.getMember().getId();
        return ApiResponse.success(buildingService.createBuilding(ownerId, requestDto));
    }

    // ✅ 건물 정보 수정 (본인 소유 건물일 때만 수정 가능)
    @PatchMapping("/{building_id}")
    public ApiResponse<BuildingResponseDto> updateBuilding(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("building_id") Long buildingId,
            @RequestBody BuildingUpdateRequestDto requestDto) {
        log.debug("건물 업데이트 요청");
        Long ownerId = userDetails.getMember().getId();
        return ApiResponse.success(buildingService.updateBuilding(buildingId, ownerId, requestDto));
    }

    // ✅ 건물 삭제 (본인 소유 건물일 때만 삭제 가능)
    @DeleteMapping("/{building_id}")
    public ApiResponse<Void> deleteBuilding(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("building_id") Long buildingId) {
        log.info("건물 삭제 요청");
        Long ownerId = userDetails.getMember().getId();
        buildingService.deleteBuilding(buildingId, ownerId);
        return ApiResponse.success();
    }
}
