package com.monthlyzip.global.common.config;

import com.monthlyzip.domain.auth.filter.JWTFilter;
import com.monthlyzip.domain.auth.filter.LoginFilter;
import com.monthlyzip.global.common.utils.JWTUtil;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;

@Configuration      // 스프링 설정 클래스
@EnableWebSecurity  // 스프링 시큐리티 활성화
@Slf4j
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    @Value("${spring.jwt.access-token-validity}")
    private long accessTokenValidity;
    @Value("${spring.jwt.refresh-token-validity}")
    private long refreshTokenValidity;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("SecurityConfig: 보안 필터 체인 구성 시작");

        // 보안 설정 비활성화 (개발 환경용)
        http
            // .cors((cors) -> cors.disable())          // CORS 제한 해제 - 모든 도메인 요청 허용
            .csrf((auth) -> auth.disable())             // CSRF 보호 비활성화 - REST API에서 주로 사용
            .formLogin((auth) -> auth.disable())        // 기본 로그인 페이지 사용 안함
            .httpBasic((auth) -> auth.disable());       // HTTP Basic 인증 비활성화

        // URL 접근 권한 설정
        http
            .authorizeHttpRequests((auth) -> auth
                .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/signup").permitAll()
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated());                             // 그 외 모든 요청은 인증 필요

        http
            .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        //AuthenticationManager()와 JWTUtil 인수 전달
        http
            .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, accessTokenValidity, refreshTokenValidity), UsernamePasswordAuthenticationFilter.class);

        // JWT 사용을 위한 세션 관리 설정
        http
            .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));   // 세션 상태 유지 안함 (JWT 사용 시 필수)


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOriginPattern("http://localhost:*");
        config.addAllowedOriginPattern("http://127.0.0.1:*");
        // config.addAllowedOriginPattern("https://your-frontend-domain.com");

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}