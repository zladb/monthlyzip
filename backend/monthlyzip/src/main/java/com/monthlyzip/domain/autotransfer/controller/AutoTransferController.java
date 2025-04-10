package com.monthlyzip.domain.autotransfer.controller;


import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.autotransfer.dto.request.AutoTransferCreateRequest;
import com.monthlyzip.domain.autotransfer.dto.response.AutoTransferCreateResponse;
import com.monthlyzip.domain.autotransfer.dto.response.AutoTransferInitResponse;
import com.monthlyzip.domain.autotransfer.dto.response.AutoTransferStatusResponse;
import com.monthlyzip.domain.autotransfer.service.AutoTransferService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/autotransfers")
@RequiredArgsConstructor
public class AutoTransferController {

    private final AutoTransferService autoTransferService;
    @GetMapping
    public ApiResponse<AutoTransferInitResponse> initAutoTransfer(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();
        log.debug("자동이체 초기 등록 정보 조회");
        return ApiResponse.success(autoTransferService.initAutoTransfer(memberId));
    }

    @PostMapping
    public ApiResponse<AutoTransferCreateResponse> createAutoTransfer(
            @RequestBody AutoTransferCreateRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(autoTransferService.createAutoTransfer(memberId, request));
    }

    @DeleteMapping
    public ApiResponse<Void> deleteAutoTransfer(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long memberId = userDetails.getMember().getId();
        autoTransferService.deleteAutoTransfer(memberId);
        return ApiResponse.success();
    }

    @GetMapping("/status")
    public ApiResponse<AutoTransferStatusResponse> statusAutoTransfer(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long memberId = userDetails.getMember().getId();
        boolean isRegistered = autoTransferService.statusAutoTransfer(memberId);
        return ApiResponse.success(new AutoTransferStatusResponse(isRegistered));
    }
}