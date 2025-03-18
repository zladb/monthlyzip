package com.monthlyzip.domain.test.repository;

import com.monthlyzip.domain.test.model.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공
}
