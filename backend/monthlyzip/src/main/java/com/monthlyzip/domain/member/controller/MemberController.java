package com.monthlyzip.domain.member.controller;

import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.member.dto.request.UpdatePasswordRequest;
import com.monthlyzip.domain.member.dto.response.MemberResponse;
import com.monthlyzip.domain.member.service.MemberService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private MemberService memberService;

    // 회원정보 조회
    @GetMapping("/me")
    public ApiResponse<MemberResponse> getMemberInfo(
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long memberId = userDetails.getMember().getMemberId();
        return ApiResponse.success(memberService.getMemberInfo(memberId));
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ApiResponse<Void> updatePassword(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody UpdatePasswordRequest request) {

        memberService.updatePassword(userDetails.getMember().getMemberId(), request.getPassword(), request.getConfirmPassword());
        log.info("비밀번호 변경 완료");
        return ApiResponse.success();
    }

    // 이미지 업데이트
    @PutMapping("/profile-image")
    public ApiResponse<Void> updateProfileImage(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam("image") MultipartFile image) {

        memberService.updateProfileImage(userDetails.getMember().getMemberId(), image);
        log.info("이미지 업데이트 완료");
        return ApiResponse.success();
    }

    // 회원 탈퇴
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
