package com.monthlyzip.domain.transfer.controller;

import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.transfer.dto.request.TransferRequest;
import com.monthlyzip.domain.transfer.dto.response.TransferInitResponse;
import com.monthlyzip.domain.transfer.service.TransferService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
public class TransferController {
    private final TransferService transferService;

    @GetMapping
    public ApiResponse<TransferInitResponse> getTransferInitInfo(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();

        log.debug("이체 초기 등록 정보 조회");
        return ApiResponse.success(transferService.getTransferInitInfo(memberId));
    }

    @PostMapping
    public ApiResponse<Void> transfer(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody TransferRequest request
    ) {
        Long memberId = userDetails.getMember().getId();
        transferService.processTransfer(request, memberId);
        return ApiResponse.success();
    }
}
