package com.monthlyzip.domain.autotransfer.repository;

import com.monthlyzip.domain.autotransfer.entity.AutoTransfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutoTransferRepository extends JpaRepository<AutoTransfer, Long> {

    Optional<AutoTransfer> findByTenant_Id(Long memberId);

    List<AutoTransfer> findAllByPaymentDay(short paymentDay);

}