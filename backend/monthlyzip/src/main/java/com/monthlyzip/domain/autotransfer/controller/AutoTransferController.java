package com.monthlyzip.domain.autotransfer.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/autotransfers")
@RequiredArgsConstructor
public class AutoTransferController {

//    @GetMapping
//    public ApiResponse<AutoTransferInitResponse> initAutoTransfer(
//            @AuthenticationPrincipal CustomUserDetails userDetails) {
//        // 토큰에서 memberId 추출
//        Long memberId = userDetails.getMember().getId();
//        log.debug("자동이체 초기 등록 정보 조회");
//        return ApiResponse.success(AutoTransferService.initAutoTransfer(memberId));
//    }



}
