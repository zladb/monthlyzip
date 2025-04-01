package com.monthlyzip.domain.dashboard.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.dashboard.model.dto.response.DashboardResponseDto;
import com.monthlyzip.domain.dashboard.service.DashboardService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ApiResponse<DashboardResponseDto> getMainDashboard(
        @AuthenticationPrincipal CustomUserDetails userDetails) {

        // 실제 환경에서는 토큰에서 추출
        // Long memberId = userDetails.getMember().getMemberId();

        // 테스트를 위한 임시 사용자 ID
        Long memberId = 1L; // 임대인 ID (필요에 따라 2L로 변경하여 임차인 테스트)

        log.info("대시보드 메인 페이지 요청: 사용자 ID {}", memberId);
        return ApiResponse.success(dashboardService.getMainDashboard(memberId));
    }
}