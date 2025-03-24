package com.monthlyzip.domain.auth.repository;

import com.monthlyzip.domain.auth.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<MemberEntity, Long> {

    Boolean existsByEmail(String email);

    Optional<MemberEntity> findByEmail(String email);
}
