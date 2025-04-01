package com.monthlyzip.domain.payment.model.dto.request;


import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class PaymentCreateRequestDto {
    @NotNull(message = "contractId는 필수입니다.")
    private Long contractId;

    @NotNull(message = "paymentDate는 필수입니다.")
    private LocalDateTime paymentDate;

    @NotNull(message = "dueDate는 필수입니다.")
    private LocalDateTime dueDate;

    @NotNull(message = "amount는 필수입니다.")
    private Long amount;

    @NotNull(message = "paymentStatus는 필수입니다.")
    private PaymentStatus paymentStatus;

    private Boolean paymentProof;
}
