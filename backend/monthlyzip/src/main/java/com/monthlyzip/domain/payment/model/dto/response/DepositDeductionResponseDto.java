package com.monthlyzip.domain.payment.model.dto.response;

import com.monthlyzip.domain.payment.model.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@ToString
public class DepositDeductionResponseDto {
    private Long paymentId;
    private Long contractId;
    private Long deductedAmount;
    private Long remainingDeposit;
    private String status; // e.g. "보증금차감"
    private LocalDateTime processedAt;

    public static DepositDeductionResponseDto of(Payment payment, Long deductedAmount, Long remainingDeposit) {
        return new DepositDeductionResponseDto(
                payment.getId(),
                payment.getContract().getId(),
                deductedAmount,
                remainingDeposit,
                payment.getPaymentStatus().name(),
                payment.getPaymentDate()
        );
    }
}
