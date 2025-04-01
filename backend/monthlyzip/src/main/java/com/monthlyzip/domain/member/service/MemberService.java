package com.monthlyzip.domain.member.service;

import com.monthlyzip.domain.auth.service.TokenService;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.global.common.utils.JWTUtil;
import com.monthlyzip.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenService tokenService;
    private final JWTUtil jwtUtil;


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
