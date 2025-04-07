package com.monthlyzip.domain.payment.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.dto.response.DepositDeductionResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentCreateResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentResponseDto;
import com.monthlyzip.domain.payment.service.PaymentService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    // 납부 내역 생성
    @PostMapping
    public ApiResponse<PaymentCreateResponseDto> createPayment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid PaymentCreateRequestDto requestDto) {
        // 토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();
        log.debug("납부 생성 요청");
        return ApiResponse.success(paymentService.createPayment(memberId, requestDto));
    }

    // 납부 목록 조회
    @GetMapping
    public ApiResponse<List<PaymentResponseDto>> getPayments(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();
        log.debug("납부 목록 조회 요청");
        return ApiResponse.success(paymentService.getPayments(memberId));
    }

    // 납부 상세 조회
    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponseDto> getPaymentById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long paymentId) {
//         토큰에서 memberId 추출
        Long memberId = userDetails.getMember().getId();
        log.debug("납부 상세 조회 요청");
        return ApiResponse.success(paymentService.getPaymentById(memberId, paymentId));
    }

    @GetMapping("/income/current-month")
    public ApiResponse<Map<String, Long>> getCurrentMonthIncome(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long landlordId = userDetails.getMember().getId();
        Long totalIncome = paymentService.getCurrentMonthIncome(landlordId);

        Map<String, Long> result = new HashMap<>();
        result.put("totalIncome", totalIncome);

        return ApiResponse.success(result);
    }

    @PostMapping("/deposit-deduction")
    public ApiResponse<DepositDeductionResponseDto> createDepositDeduction(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long memberId = userDetails.getMember().getId(); // 임차인
        log.info("[보증금 차감 요청] userId = {}", userDetails.getMember().getId()); // ✅ 로그
        return ApiResponse.success(paymentService.createDepositDeduction(memberId));
    }



    @GetMapping("/deposit-balance/{contractId}")
    public ApiResponse<Map<String, Long>> getDepositBalance(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long contractId) {
        Long memberId = userDetails.getMember().getId();
        Long balance = paymentService.getDepositBalance(memberId, contractId);
        Map<String, Long> result = new HashMap<>();
        result.put("depositBalance", balance);
        return ApiResponse.success(result);
    }


/**
    // 납부 상태 수정
    @PatchMapping("/{paymentId}")
    public ApiResponse<PaymentCreateResponseDto> updatePaymentStatus(
            @PathVariable Long paymentId,
            @RequestBody @Valid PaymentStatusUpdateRequestDto requestDto) {
        log.debug("납부 상태 수정 요청");
        return ApiResponse.success(paymentService.updatePaymentStatus(paymentId, requestDto));
    }

    // 납부 내역 삭제
    @DeleteMapping("/{paymentId}")
    public ApiResponse<Void> deletePayment(@PathVariable Long paymentId) {
        log.info("납부 삭제 요청");
        paymentService.deletePayment(paymentId);
        return ApiResponse.success();
    }
    **/
}