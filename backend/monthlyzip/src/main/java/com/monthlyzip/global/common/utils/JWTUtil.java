package com.monthlyzip.global.common.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component  // 스프링 빈으로 등록
public class JWTUtil {

    private SecretKey secretKey;  // JWT 서명에 사용할 비밀키

    // 생성자: application.yml에서 설정한 secret 값으로 비밀키 생성
    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), SIG.HS256.key().build().getAlgorithm());
    }

    // JWT 토큰에서 memberId 추출
    public Long getMemberId(String token) {
        return Jwts.parser().verifyWith(secretKey).build()
                .parseSignedClaims(token).getPayload()
                .get("memberId", Long.class);
    }

    // JWT 토큰에서 userType 추출
    public String getUserType(String token) {
        return Jwts.parser().verifyWith(secretKey).build()
                .parseSignedClaims(token).getPayload()
                .get("userType", String.class);
    }

    // JWT 토큰 만료 여부 확인
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build()
            .parseSignedClaims(token).getPayload()
            .getExpiration().before(new Date());  // 토큰의 만료시간이 현재시간보다 이전인지 확인
    }

    // JWT 토큰 생성
    public String createJwt(Long memberId, String role, String userType, Long expiredMs) {
        System.out.println("Token Created !!!");

        return Jwts.builder()
            .claim("memberId", memberId)  // 사용자 ID 정보 저장
            .claim("role", role)  // 사용자 권한 정보 저장
            .claim("userType", userType)
            .issuedAt(new Date(System.currentTimeMillis()))  // 토큰 발행 시간
            .expiration(new Date(System.currentTimeMillis() + expiredMs))  // 토큰 만료 시간 설정
            .signWith(secretKey)  // 비밀키로 서명
            .compact();  // 최종 JWT 문자열 생성
    }
}