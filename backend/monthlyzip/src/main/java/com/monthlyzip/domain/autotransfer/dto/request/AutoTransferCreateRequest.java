package com.monthlyzip.domain.autotransfer.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AutoTransferCreateRequest {
    private Long contractId;
    private String fromAccount;
    private String toAccount;
    private Long amount;
    private int paymentDay;
    private LocalDate startMonth;
    private LocalDate endMonth;
}