package com.monthlyzip.domain.payment.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentCreateResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentResponseDto;
import com.monthlyzip.domain.payment.service.PaymentService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
//        Long memberId = userDetails.getMember().getMemberId();
        // 테스트용 memberId 자동 생성
        Long memberId = 1L;
        log.debug("납부 생성 요청");
        return ApiResponse.success(paymentService.createPayment(memberId, requestDto));
    }

    // 납부 목록 조회
    @GetMapping
    public ApiResponse<List<PaymentResponseDto>> getPayments(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 토큰에서 memberId 추출
//        Long memberId = userDetails.getMember().getMemberId();
        // 테스트용 memberId 자동 생성
        Long memberId = 2L;
        log.debug("납부 목록 조회 요청");
        return ApiResponse.success(paymentService.getPayments(memberId));
    }

    // 납부 상세 조회
    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponseDto> getPaymentById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long paymentId) {
        // 토큰에서 memberId 추출
//        Long memberId = userDetails.getMember().getMemberId();
        // 테스트용 memberId 자동 생성
        Long memberId = 2L;
        log.debug("납부 상세 조회 요청");
        return ApiResponse.success(paymentService.getPaymentById(memberId, paymentId));
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