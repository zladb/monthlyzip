package com.monthlyzip.domain.tenant.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.tenant.model.dto.response.TenantDetailResponseDto;
import com.monthlyzip.domain.tenant.model.dto.response.TenantSummaryResponseDto;
import com.monthlyzip.domain.tenant.service.TenantService;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    // ✅ 임차인 목록 조회 (임대인만 가능)
    @GetMapping
    public ApiResponse<List<TenantSummaryResponseDto>> getTenantsByBuilding(
            @RequestParam(required = false) Long buildingId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        if (buildingId == null) {
            throw new BusinessException(ApiResponseStatus.MISSING_REQUEST_PARAMETER);
        }

        if (userDetails.getMember().isTenant()) {
            log.warn("❌ 임차인이 임차인 목록 조회 시도 - memberId: {}", userDetails.getMember().getId());
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        Long landlordId = userDetails.getMember().getId();
        return ApiResponse.success(tenantService.getTenantsByBuilding(buildingId, landlordId));
    }

    // ✅ 임차인 상세 조회 (임대인만 가능)
    @GetMapping("/{roomId}/detail")
    public ApiResponse<TenantDetailResponseDto> getTenantDetail(
            @PathVariable Long roomId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        if (userDetails.getMember().isTenant()) {
            log.warn("❌ 임차인이 임차인 상세 조회 시도 - memberId: {}", userDetails.getMember().getId());
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        Long landlordId = userDetails.getMember().getId();
        return ApiResponse.success(tenantService.getTenantDetailByRoomId(roomId, landlordId));
    }
}
