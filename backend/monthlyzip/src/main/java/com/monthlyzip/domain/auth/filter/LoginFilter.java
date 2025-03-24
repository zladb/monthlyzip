package com.monthlyzip.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
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
    // 생성자에서 /api/login을 처리하도록 설정
    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/api/auth/login"); // 필터가 처리할 로그인 URL 지정
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> requestMap = null;
        try {
            requestMap = objectMapper.readValue(request.getInputStream(), Map.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String email = requestMap.get("email");
        String password = requestMap.get("password");
        //클라이언트 요청에서 username, password 추출
//        String email = obtainUsername(request);
//        String password = obtainPassword(request);

        System.out.println(email);
        System.out.println(password);

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함/
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
//        GrantedAuthority auth = iterator.next();

//        String role = auth.getAuthority();
        String role = "ROLE_USER";

        // String token = jwtUtil.createJwt(username, role, 60*60*1000L);
        String token = jwtUtil.createJwt(username, role, 60*60*10*1000L);

        response.addHeader("Authorization", "Bearer " + token);
        System.out.println("success !!!");
    }

    //로그인 실패시 401응답
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
        System.out.println("fail !!!");
    }
}
