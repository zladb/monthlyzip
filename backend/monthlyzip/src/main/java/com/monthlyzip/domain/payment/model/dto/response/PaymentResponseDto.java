package com.monthlyzip.domain.payment.model.dto.response;

import com.monthlyzip.domain.payment.model.entity.PaymentEntity;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDto {
    private Long paymentId;
    private Long contractId;
    private LocalDateTime paymentDate;
    private LocalDateTime dueDate;
    private Long amount;
    private PaymentStatus paymentStatus;
    private Boolean paymentProof;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 정적 팩토리 메서드
    public static PaymentResponseDto from(PaymentEntity entity) {
        return PaymentResponseDto.builder()
                .paymentId(entity.getId())
                .contractId(entity.getContract().getId())
                .paymentDate(entity.getPaymentDate())
                .dueDate(entity.getDueDate())
                .amount(entity.getAmount())
                .paymentStatus(entity.getPaymentStatus())
                .paymentProof(entity.getPaymentProof())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}