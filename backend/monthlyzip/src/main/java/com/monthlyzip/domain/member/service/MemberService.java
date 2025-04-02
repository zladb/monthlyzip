package com.monthlyzip.domain.member.service;

import com.monthlyzip.domain.auth.service.TokenService;
import com.monthlyzip.domain.member.dto.response.MemberResponse;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.global.common.utils.FileUtil;
import com.monthlyzip.global.common.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenService tokenService;
    private final JWTUtil jwtUtil;
    @Value("${app.baseUrl}")
    private String baseUrl;
    private final PasswordEncoder passwordEncoder;

    // 회원 정보 조회
    public MemberResponse getMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        String profileImageUrl = member.getProfileImageUrl();
        if (profileImageUrl == null || profileImageUrl.isBlank()) {
            profileImageUrl = baseUrl + "/images/default-image.jpg";
        }else {
            profileImageUrl = baseUrl + profileImageUrl; // "/images/xxx.jpg" 로 저장돼 있다고 가정
        }

        return MemberResponse.builder()
                .profileImageUrl(profileImageUrl)
                .userType(member.getMemberType().name())
                .email(member.getEmail())
                .name(member.getName())
                .phoneNumber(member.getPhoneNumber())
                .build();
    }

    public void updatePassword(Long memberId, String password, String passwordConfirm) {
        // 비밀번호가 비었을때 확인
        if (password == null || passwordConfirm == null) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_INVALID);
        }
        // 비밀번호 둘이 다를때 확인
        if (!password.equals(passwordConfirm)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_MISMATCH);
        }
        // 비밀번호 유형에 안맞을때
        String passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
        if (!password.matches(passwordPattern)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_INVALID);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 비밀번호 암호화 로직 필요
        String encodedPassword = passwordEncoder.encode(password);
        member.setPassword(encodedPassword);
        memberRepository.save(member);
    }

    public void updateProfileImage(Long memberId, MultipartFile image) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 기존 파일 삭제
        if (member.getProfileImageUrl() != null) {
            FileUtil.deleteFile(member.getProfileImageUrl());
        }

        // 새 이미지 저장
        String savedPath = FileUtil.saveFile(image);
        member.setProfileImageUrl(savedPath);
        memberRepository.save(member);
    }

    // 회원탈퇴
    public void deleteMember(Long memberId, String accessToken) {
        if (!memberRepository.existsById(memberId)) {
            log.warn("삭제 시도된 사용자 ID {}가 존재하지 않음", memberId);
            throw new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND);
        }

        memberRepository.deleteById(memberId);

        tokenService.deleteRefreshToken(memberId);
        long remainingMillis = jwtUtil.getExpiration(accessToken).getTime() - System.currentTimeMillis();
        if (remainingMillis < 1000) remainingMillis = 1000;
        tokenService.blacklistAccessToken(accessToken, remainingMillis);
    }
}
