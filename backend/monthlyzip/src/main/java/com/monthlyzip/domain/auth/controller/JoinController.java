package com.monthlyzip.domain.auth.controller;

import com.monthlyzip.domain.auth.model.dto.JoinDto;
import com.monthlyzip.domain.auth.service.JoinService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class JoinController {



    private final JoinService joinService;

    @PostMapping("/signup")
    public String joinProcess(JoinDto joinDto) {

        System.out.println("Join Controller !");

        joinService.joinProcess(joinDto);

        return "ok";
    }
}
