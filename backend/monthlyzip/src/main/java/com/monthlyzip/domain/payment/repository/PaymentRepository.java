package com.monthlyzip.domain.payment.repository;

import com.monthlyzip.domain.payment.model.entity.PaymentEntity;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    // 특정 계약(contract)과 관련된 결제 목록 조회
    List<PaymentEntity> findByContractId(Long contractId);

    // 결제 상태로 필터링
    List<PaymentEntity> findByPaymentStatus(PaymentStatus status);

    // 납부일이 특정 날짜 이전인 것들 (예: 연체 확인용)
    List<PaymentEntity> findByDueDateBefore(LocalDateTime now);

    // 증빙이 올라온 결제들
    List<PaymentEntity> findByPaymentProofTrue();
}