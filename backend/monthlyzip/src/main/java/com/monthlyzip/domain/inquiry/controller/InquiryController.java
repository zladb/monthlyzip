package com.monthlyzip.domain.inquiry.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.inquiry.model.dto.request.InquiryCreateRequestDto;
import com.monthlyzip.domain.inquiry.model.dto.request.InquiryUpdateRequestDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryCreateResponseDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryDetailResponseDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryResponseDto;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import com.monthlyzip.domain.inquiry.service.InquiryService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor

public class InquiryController {

    private final InquiryService inquiryService;

    // 문의 등록
    @PostMapping
    public ApiResponse<InquiryCreateResponseDto> createInquiry(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @RequestBody @Valid InquiryCreateRequestDto requestDto) {

        // 테스트용 memberId 임의 설정 (나중에 주석 해제)
        Long memberId = userDetails.getMember().getId();
        // Long memberId = 2L; // 임차인 ID로 가정

        log.debug("문의 등록 요청");
        return ApiResponse.success(inquiryService.createInquiry(memberId, requestDto));
    }

    // 문의 목록 조회
    @GetMapping
    public ApiResponse<List<InquiryResponseDto>> getInquiries(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) InquiryType inquiryType) {
        // 테스트용 memberId 임의 설정
        Long memberId = userDetails.getMember().getId();
        log.info("문의 전체 목록 조회 !! ");

        // Long memberId = 1L; // 임대인 ID로 가정 (필요에 따라 변경)
        // Long memberId = 2L; // 임차인 ID로 가정 (필요에 따라 변경)

        log.debug("문의 목록 조회 요청");
        return ApiResponse.success(inquiryService.getInquiries(memberId, status, inquiryType));
    }

    // 문의 상세 조회
    @GetMapping("/{inquiryId}")
    public ApiResponse<InquiryDetailResponseDto> getInquiryDetail(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @PathVariable Long inquiryId) {
        // 테스트용 memberId 임의 설정
        Long memberId = userDetails.getMember().getId();
        // Long memberId = 1L; // 임대인 ID로 가정

        log.debug("문의 상세 조회 요청");
        return ApiResponse.success(inquiryService.getInquiryDetail(memberId, inquiryId));
    }

    // 문의 상태 수정
    @PatchMapping("/{inquiryId}")
    public ApiResponse<InquiryResponseDto> updateInquiry(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @PathVariable Long inquiryId,
        @RequestBody @Valid InquiryUpdateRequestDto requestDto) {
        // 테스트용 memberId 임의 설정
         Long memberId = userDetails.getMember().getId();

        // Long memberId = 1L; // 임대인 ID로 가정
        // Long memberId = 2L; // 임차인 ID로 가정

        log.debug("문의 상태 수정 요청");
        return ApiResponse.success(inquiryService.updateInquiry(memberId, inquiryId, requestDto));
    }

    // 문의 삭제
    @DeleteMapping("/{inquiryId}")
    public ApiResponse<Void> deleteInquiry(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @PathVariable Long inquiryId) {
        // 테스트용 memberId 임의 설정
        Long memberId = userDetails.getMember().getId();
        // Long memberId = 2L; // 임차인 ID로 가정

        log.debug("문의 삭제 요청");
        inquiryService.deleteInquiry(memberId, inquiryId);
        return ApiResponse.success();
    }
}
