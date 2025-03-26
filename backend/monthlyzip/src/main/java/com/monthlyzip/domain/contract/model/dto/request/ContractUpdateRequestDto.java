package com.monthlyzip.domain.contract.model.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractUpdateRequestDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long monthlyRent;
    private Long deposit;
    private Integer paymentDay;
    private String bankAccount;
}
