package com.monthlyzip.domain.test.controller;

import com.monthlyzip.domain.test.model.entity.Test;
import com.monthlyzip.domain.test.service.TestService;
import com.monthlyzip.global.common.model.dto.BaseResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping
    public ResponseEntity<BaseResponse<List<Test>>> getDummyData() {
        List<Test> dummyData = testService.getDummyData();
        return ResponseEntity.ok(new BaseResponse<>(dummyData));
    }
}
