package com.monthlyzip.domain.auth.controller;

import com.monthlyzip.domain.auth.model.dto.JoinDto;
import com.monthlyzip.domain.auth.service.JoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor  // 생성자 주입 받기
public class AdminController {

    private final JoinService joinService;

    @GetMapping("/admin")
    public String adminP(JoinDto joinDto) {
        return "Admin Controller";
    }
}
