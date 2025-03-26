package com.monthlyzip.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monthlyzip.domain.auth.entity.MemberEntity;
import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.global.common.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


//@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;
    // 생성자에서 /api/login을 처리하도록 설정
    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, long accessTokenValidity, long refreshTokenValidity) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.accessTokenValidity = accessTokenValidity;
        this.refreshTokenValidity = refreshTokenValidity;

        setFilterProcessesUrl("/api/auth/login"); // 필터가 처리할 로그인 URL 지정
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // Json 형식 requestMap으로 받기
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> requestMap = null;
        try {
            requestMap = objectMapper.readValue(request.getInputStream(), Map.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //클라이언트 요청에서 id(email), password 추출
        String email = requestMap.get("email");
        String password = requestMap.get("password");

        System.out.println("Login 요청!! : email : " + email + " password : " + password);

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함/
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        MemberEntity member = customUserDetails.getMember();

        Long memberId = member.getMemberId();
        String userType = member.getMemberType().name();
        String role = "ROLE_USER";

        String accessToken = jwtUtil.createAccessToken(memberId, role, userType, accessTokenValidity);
//        String refreshToken = jwtUtil.createRefreshToken(memberId, refreshTokenValidity);

        response.addHeader("Authorization", "Bearer " + accessToken);
        System.out.println("로그인 성공, 토큰 정상 발급 !");
    }

    //로그인 실패시 401응답
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
        System.out.println("로그인 실패, 토큰 발급 실패 !");
    }
}