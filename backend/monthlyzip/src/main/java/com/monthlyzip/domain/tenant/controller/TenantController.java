package com.monthlyzip.domain.tenant.controller;

import com.monthlyzip.domain.tenant.model.dto.response.TenantDetailResponseDto;
import com.monthlyzip.domain.tenant.model.dto.response.TenantSummaryResponseDto;
import com.monthlyzip.domain.tenant.service.TenantService;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    // ✅ 빌딩 기준 임차인 목록 조회
    @GetMapping
    public ApiResponse<List<TenantSummaryResponseDto>> getTenantsByBuilding(
            @RequestParam(required = false) Long buildingId
    ) {
        if (buildingId == null) {
            throw new BusinessException(ApiResponseStatus.MISSING_REQUEST_PARAMETER);
        }
        return ApiResponse.success(tenantService.getTenantsByBuilding(buildingId));
    }

    // ✅ 오른쪽 상세: 방 기준 임차인 상세 조회
    @GetMapping("/{roomId}/detail")
    public ApiResponse<TenantDetailResponseDto> getTenantDetail(
            @PathVariable Long roomId
    ) {
        return ApiResponse.success(tenantService.getTenantDetailByRoomId(roomId));
    }

}
