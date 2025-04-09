package com.monthlyzip.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.auth.dto.request.LoginDto;
import com.monthlyzip.domain.auth.service.TokenService;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.global.common.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;
    private final TokenService tokenService;
    // 생성자에서 /api/login을 처리하도록 설정
    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, long accessTokenValidity, long refreshTokenValidity, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.accessTokenValidity = accessTokenValidity;
        this.refreshTokenValidity = refreshTokenValidity;
        this.tokenService = tokenService;

        setFilterProcessesUrl("/api/auth/login"); // 필터가 처리할 로그인 URL 지정
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // Json 형식 requestMap으로 받기
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new BusinessException(ApiResponseStatus.BAD_REQUEST);
        }

        //클라이언트 요청에서 id(email), password 추출
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        System.out.println("Login 요청!! : email : " + email);

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함/
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Member member = customUserDetails.getMember();

        Long memberId = member.getId();
        String userType = member.getMemberType().name();
        String role = "ROLE_USER";

        // 토큰 발급
        String accessToken = jwtUtil.createAccessToken(memberId, role, userType, accessTokenValidity);
        String refreshToken = jwtUtil.createRefreshToken(memberId, refreshTokenValidity);

        // Refresh Token → 쿠키로 설정 (HttpOnly, Secure 설정 권장)
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
//        refreshTokenCookie.setSecure(true); // HTTPS 환경에서 true
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge((int) (refreshTokenValidity / 1000));
        response.addCookie(refreshTokenCookie);

        // Access Token → JSON 응답
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);

        ApiResponse<Map<String, String>> apiResponse = ApiResponse.success(result);

        try {
            new ObjectMapper().writeValue(response.getWriter(), apiResponse);
        } catch (IOException e) {
            throw new BusinessException(ApiResponseStatus.LOGIN_ERROR);
        }

        // refresh token redis에 저장
        tokenService.saveRefreshToken(memberId, refreshToken, refreshTokenValidity);

        System.out.println("로그인 성공, 토큰 정상 발급 !");
    }

    //로그인 실패시 401응답
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ApiResponse<Void> failResponse = ApiResponse.fail(ApiResponseStatus.BAD_REQUEST);
        try {
            new ObjectMapper().writeValue(response.getWriter(), failResponse);
        } catch (IOException e) {
            throw new BusinessException(ApiResponseStatus.LOGIN_ERROR);
        }
        System.out.println("로그인 실패: " + failed.getMessage());
    }
}