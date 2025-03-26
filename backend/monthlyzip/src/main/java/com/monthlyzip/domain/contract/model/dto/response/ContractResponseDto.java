package com.monthlyzip.domain.contract.model.dto.response;

import com.monthlyzip.domain.contract.model.entity.Contract;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractResponseDto {

    private Long contractId;
    private Long roomId;
    private Long landlordId;
    private Long tenantId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long monthlyRent;
    private Long deposit;
    private Integer paymentDay;
    private String bankAccount;
    private Boolean isActiveLandlord;
    private Boolean isActiveTenant;

    public static ContractResponseDto of(Contract contract) {
        return ContractResponseDto.builder()
                .contractId(contract.getId())
                .roomId(contract.getRoom().getId())
                .landlordId(contract.getLandlordId())
                .tenantId(contract.getTenantId())
                .startDate(contract.getStartDate())
                .endDate(contract.getEndDate())
                .monthlyRent(contract.getMonthlyRent())
                .deposit(contract.getDeposit())
                .paymentDay(contract.getPaymentDay())
                .bankAccount(contract.getBankAccount())
                .isActiveLandlord(contract.getIsActiveLandlord())
                .isActiveTenant(contract.getIsActiveTenant())
                .build();
    }
}
