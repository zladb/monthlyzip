package com.fintech.domain.test.service;

import com.fintech.domain.test.model.entity.Test;
import com.fintech.domain.test.repository.TestRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TestService {

    private final TestRepository testRepository;

    /**
     * 테스트 서비스
     */
    public List<Test> getDummyData() {
        List<Test> dummyDatas = testRepository.findAll();

        return dummyDatas;
    }
}
