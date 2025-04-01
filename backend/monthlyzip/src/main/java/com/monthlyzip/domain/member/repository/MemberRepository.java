package com.monthlyzip.domain.member.repository;

import com.monthlyzip.domain.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Boolean existsByEmail(String email);

    Optional<MemberEntity> findByEmail(String email);
}
