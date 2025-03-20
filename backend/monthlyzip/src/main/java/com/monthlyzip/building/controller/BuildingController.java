package com.monthlyzip.building.controller;

import com.monthlyzip.building.model.dto.request.BuildingRequestDto;
import com.monthlyzip.building.model.dto.request.BuildingUpdateRequestDto;
import com.monthlyzip.building.model.dto.response.BuildingDetailResponseDto;
import com.monthlyzip.building.model.dto.response.BuildingResponseDto;
import com.monthlyzip.building.service.BuildingService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
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
        log.debug("건물 상세 조회 요청 - ID: {}", buildingId);
        return ApiResponse.success(buildingService.getBuildingById(buildingId));
    }

    // ✅ 건물 목록 조회 (소유자 ID가 선택적으로 포함될 수 있음) - rjsnaf
    @GetMapping
    public ApiResponse<List<BuildingResponseDto>> getBuildings(
            @RequestParam(value = "ownerId", required = false) Long ownerId) {
        log.debug("건물 목록 조회 요청 - ownerId: {}", ownerId);
        return ApiResponse.success(buildingService.getBuildings(ownerId));
    }

    // ✅ 건물 정보 등록
    @PostMapping
    public ApiResponse<BuildingResponseDto> createBuilding(
            @RequestBody @Valid BuildingRequestDto requestDto
    ){
        log.debug("건물 생성 요청 - 데이터: {}", requestDto);
        return ApiResponse.success(buildingService.createBuilding(requestDto));
    }

    // ✅ 건물 정보 수정
    @PatchMapping("/{building_id}")
    public ApiResponse<BuildingResponseDto> updateBuilding(
            @PathVariable("building_id") Long buildingId,
            @RequestBody BuildingUpdateRequestDto requestDto) {
        log.debug("건물 업데이트 요청 - 데이터: {}", requestDto);
        return ApiResponse.success(buildingService.updateBuilding(buildingId, requestDto));
    }

    // ✅ 건물 삭제
    @DeleteMapping("/{building_id}")
    public ApiResponse<Void> deleteBuilding(@PathVariable("building_id") Long buildingId) {
        log.info("건물 삭제 요청 - ID: {}", buildingId);
        buildingService.deleteBuilding(buildingId);
        return ApiResponse.success();  // ✅ 204 No Content 응답
    }
}
