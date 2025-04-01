package com.monthlyzip.domain.auth.controller;

import com.monthlyzip.domain.auth.model.dto.JoinDto;
import com.monthlyzip.domain.auth.service.JoinService;

import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class JoinController {

    private final JoinService joinService;

    @PostMapping("/signup")
    public ApiResponse<Void> joinProcess(@RequestBody JoinDto joinDto) {

        log.debug("회원 가입 요청");
        joinService.joinProcess(joinDto);
        return ApiResponse.success();
    }
}
