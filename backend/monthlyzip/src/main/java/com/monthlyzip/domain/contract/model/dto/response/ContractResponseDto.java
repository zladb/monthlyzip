package com.monthlyzip.domain.contract.model.dto.response;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.room.model.entity.Room;
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
    private String roomDetailedAddress;

    private Long buildingId;
    private String buildingName;
    private String buildingAddress;

    private Long landlordId;
    private String landlordName;

    private Long tenantId;
    private String tenantName;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long monthlyRent;
    private Long deposit;
    private Integer paymentDay;
    private String bankAccount;

    private Boolean isActiveLandlord;
    private Boolean isActiveTenant;

    public static ContractResponseDto of(
            Contract contract,
            Member landlord,
            Member tenant
    ) {
        Room room = contract.getRoom();

        return ContractResponseDto.builder()
                .contractId(contract.getId())
                .roomId(room.getId())
                .roomDetailedAddress(room.getDetailAddress())
                .buildingId(room.getBuilding().getId())
                .buildingName(room.getBuilding().getBuildingName())
                .buildingAddress(room.getBuilding().getAddress())
                .landlordId(contract.getLandlordId())
                .landlordName(landlord != null ? landlord.getName() : null)
                .tenantId(contract.getTenantId())
                .tenantName(tenant != null ? tenant.getName() : null)
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
