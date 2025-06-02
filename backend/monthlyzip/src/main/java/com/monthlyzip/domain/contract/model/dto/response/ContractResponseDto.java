package com.monthlyzip.domain.contract.model.dto.response;

import com.monthlyzip.domain.contract.model.entity.Contract;
<<<<<<< HEAD
=======
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.room.model.entity.Room;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractResponseDto {

    private Long contractId;
<<<<<<< HEAD
    private Long roomId;
    private Long landlordId;
    private Long tenantId;
=======

    private Long roomId;
    private String roomDetailedAddress;

    private Long buildingId;
    private String buildingName;
    private String buildingAddress;

    private Long landlordId;
    private String landlordName;

    private Long tenantId;
    private String tenantName;

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long monthlyRent;
    private Long deposit;
    private Integer paymentDay;
    private String bankAccount;
<<<<<<< HEAD
    private Boolean isActiveLandlord;
    private Boolean isActiveTenant;

    public static ContractResponseDto of(Contract contract) {
        return ContractResponseDto.builder()
                .contractId(contract.getId())
                .roomId(contract.getRoom().getId())
                .landlordId(contract.getLandlordId())
                .tenantId(contract.getTenantId())
=======

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
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
