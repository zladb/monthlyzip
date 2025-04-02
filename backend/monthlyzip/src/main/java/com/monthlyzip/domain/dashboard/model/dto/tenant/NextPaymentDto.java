package com.monthlyzip.domain.dashboard.model.dto.tenant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NextPaymentDto {
    private String paymentDate;
    private Long amount;
    private Long paymentOverdue;
}