package com.monthlyzip.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final RedisTemplate<String, String> redisTemplate;

    private static final String RT_PREFIX = "RT:";
    private static final String BL_PREFIX = "BL:";

    // RefreshToken 저장
    public void saveRefreshToken(Long memberId, String refreshToken, long expireMillis) {
        String key = RT_PREFIX + memberId;
        redisTemplate.opsForValue().set(key, refreshToken, expireMillis, TimeUnit.MILLISECONDS);
    }

    // RefreshToken 조회
    public String getRefreshToken(Long memberId) {
        return redisTemplate.opsForValue().get(RT_PREFIX + memberId);
    }

    // RefreshToken 삭제
    public void deleteRefreshToken(Long memberId) {
        redisTemplate.delete(RT_PREFIX + memberId);
    }

    // AccessToken 블랙리스트 등록
    public void blacklistAccessToken(String accessToken, long expireMillis) {
        redisTemplate.opsForValue().set(BL_PREFIX + accessToken, "logout", expireMillis, TimeUnit.MILLISECONDS);
    }

    // AccessToken 블랙리스트 여부 확인
    public boolean isBlacklisted(String accessToken) {
        return redisTemplate.hasKey(BL_PREFIX + accessToken);
    }
}