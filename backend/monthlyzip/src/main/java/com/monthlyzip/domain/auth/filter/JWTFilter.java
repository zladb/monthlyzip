package com.monthlyzip.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monthlyzip.domain.member.entity.MemberEntity;
import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.member.enums.MemberType;
import com.monthlyzip.domain.auth.service.TokenService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.global.common.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization= request.getHeader("Authorization");

        System.out.println("로그인 시도... : authorization : " + authorization);

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            // 토큰 없다고만 하고 다음으로 넘어감
            System.out.println("accessToken null");
            filterChain.doFilter(request, response);
            return;
//          여기서 null 이면 허용된 url 제외하면 정상 요청이 아니기때문에 다 반환하려면 써야함
//            writeErrorResponse(response, ApiResponseStatus.UNAUTHORIZED);
//            return;
        }

        System.out.println("authorization now");
        //Bearer 부분 제거 후 순수 토큰만 획득
        String accessToken = authorization.split(" ")[1];

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(accessToken)) {
            writeErrorResponse(response, ApiResponseStatus.UNAUTHORIZED);
            return;
        }

        // 블랙리스트된 토큰 검증
        if (tokenService.isBlacklisted(accessToken)) {
            writeErrorResponse(response, ApiResponseStatus.TOKEN_EXPIRED);
            return;
        }

        //토큰에서 username 획득, admin 추가시 여기서 role도 획득
        Long memberId = jwtUtil.getMemberId(accessToken);
        String userType = jwtUtil.getUserType(accessToken);

        //userEntity를 생성하여 값 set
        MemberEntity member = new MemberEntity();
        member.setMemberId(memberId);
        member.setMemberType(MemberType.valueOf(userType));
        member.setPassword("temppassword");

        //UserDetails에 회원 정보 객체 담기
        //스프링 시큐리티 인증 토큰 생성
        //세션에 사용자 등록
        CustomUserDetails customUserDetails = new CustomUserDetails(member);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        System.out.println("로그인 성공 !!!");
        filterChain.doFilter(request, response);
    }

    // 트큰 만료 에러메세지 공통
    private void writeErrorResponse(HttpServletResponse response, ApiResponseStatus status) throws IOException {
        response.setStatus(status.getCode());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ApiResponse<Void> body = ApiResponse.fail(status);
        new ObjectMapper().writeValue(response.getWriter(), body);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/login") || path.startsWith("/api/auth/signup")
                || path.startsWith("/api/auth/logout") || path.startsWith("/api/auth/reissue");
    }
}