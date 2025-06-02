package com.monthlyzip.domain.payment.model.dto.response;

<<<<<<< HEAD
import com.monthlyzip.domain.payment.model.entity.PaymentEntity;
=======
import com.monthlyzip.domain.payment.model.entity.Payment;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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

<<<<<<< HEAD
    // 정적 팩토리 메서드
    public static PaymentResponseDto from(PaymentEntity entity) {
=======
    // 👇 추가 필드
    private String landlordName;
    private String landlordAccount;
    private String address;

    public static PaymentResponseDto from(Payment entity) {
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
                .build();
    }
}
=======

                // 👇 연관된 정보에서 임대인 정보 및 주소 추출
                .landlordName(entity.getContract().getRoom().getBuilding().getOwner().getName())
                .landlordAccount(entity.getContract().getBankAccount())
                .address(entity.getContract().getRoom().getBuilding().getAddress())
                .build();
    }
}
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
