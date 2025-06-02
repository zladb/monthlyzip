package com.monthlyzip.domain.payment.repository;

<<<<<<< HEAD
import com.monthlyzip.domain.payment.model.entity.PaymentEntity;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
=======
import com.monthlyzip.domain.payment.model.entity.Payment;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
<<<<<<< HEAD

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
=======
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // 특정 계약(contract)과 관련된 결제 목록 조회
    List<Payment> findByContractId(Long contractId);

    // 결제 상태로 필터링
    List<Payment> findByPaymentStatus(PaymentStatus status);

    // 납부일이 특정 날짜 이전인 것들 (예: 연체 확인용)
    List<Payment> findByDueDateBefore(LocalDateTime now);

    // 증빙이 올라온 결제들
    List<Payment> findByPaymentProofTrue();

    // 이번달 총 수입
    @Query("SELECT SUM(p.amount) FROM Payment p " +
            "WHERE p.contract.landlordId = :landlordId " +
            "AND p.paymentStatus = '납부완료' " +
            "AND YEAR(p.paymentDate) = :year " +
            "AND MONTH(p.paymentDate) = :month")
    Long getTotalIncomeForCurrentMonth(@Param("landlordId") Long landlordId,
                                       @Param("year") int year,
                                       @Param("month") int month);

    Optional<Payment> findTopByContractIdAndPaymentStatusOrderByDueDateDesc(Long contractId, PaymentStatus status);

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
}