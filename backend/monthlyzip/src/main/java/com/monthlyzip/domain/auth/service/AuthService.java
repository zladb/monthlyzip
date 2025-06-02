package com.monthlyzip.domain.auth.service;


import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.global.common.utils.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${spring.jwt.access-token-validity}")
    private long accessTokenValidity;

    private final TokenService tokenService;
    private final JWTUtil jwtUtil;

    public void logout(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        String accessToken = authHeader.substring(7);
        Long memberId = jwtUtil.getMemberId(accessToken);

        // refreshToken 삭제
        tokenService.deleteRefreshToken(memberId);

        // accessToken 블랙리스트 등록
        long remainingMillis = jwtUtil.getExpiration(accessToken).getTime() - System.currentTimeMillis();
        if (remainingMillis < 1000) remainingMillis = 1000;
        tokenService.blacklistAccessToken(accessToken, remainingMillis);
    }

    public Map<String, String> reissueAccessToken(HttpServletRequest request) {
        // 쿠키에서 refreshToken 꺼내기
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null || jwtUtil.isExpired(refreshToken)) {
            throw new BusinessException(ApiResponseStatus.TOKEN_EXPIRED);
        }

        // memberId 추출
        Long memberId = jwtUtil.getMemberId(refreshToken);

        // Redis에서 저장된 refreshToken과 비교
        String savedToken = tokenService.getRefreshToken(memberId);
        if (!refreshToken.equals(savedToken)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        // 새 accesstoken 발급
        String role = "ROLE_USER";
        String userType = jwtUtil.getMemberType(refreshToken);
        String newAccessToken = jwtUtil.createAccessToken(memberId, role, userType, accessTokenValidity);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", newAccessToken);
        return result;
    }
}

