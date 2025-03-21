package com.monthlyzip.domain.test.controller;

import com.monthlyzip.domain.test.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping
    public String getDummyData() {
        return "1번 api 호출 테스트 성공 !!";
    }

    @GetMapping("/infra")
    public String getInfraTest() {
        return "2번 api 호출 테스트 성공 !!";
    }
}
