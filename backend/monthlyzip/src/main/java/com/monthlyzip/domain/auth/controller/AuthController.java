package com.monthlyzip.domain.auth.controller;

import com.monthlyzip.domain.auth.service.AuthService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestHeader("Authorization") String authHeader) {
        authService.logout(authHeader);
        return ApiResponse.success();
    }

    @PostMapping("/reissue")
    public ApiResponse<Map<String, String>> reissue(HttpServletRequest request) {
        return ApiResponse.success(authService.reissueAccessToken(request));
    }
}