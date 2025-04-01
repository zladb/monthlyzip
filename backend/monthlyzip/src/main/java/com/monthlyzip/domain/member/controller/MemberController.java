package com.monthlyzip.domain.member.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.member.service.MemberService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private MemberService memberService;

//    @GetMapping("/me")
//    public ApiResponse


    @DeleteMapping
    public ApiResponse<Void> deleteMember(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        @RequestHeader("Authorization") String authorizationHeader) {
        Long memberId = userDetails.getMember().getMemberId();
        String accessToken = authorizationHeader.replace("Bearer ", "");

        memberService.deleteMember(memberId, accessToken);
        log.info("회원 탈퇴 완료");
        return ApiResponse.success();
    }
}
