package com.monthlyzip.domain.contract.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractRequestDto {

    @NotNull
    private Long roomId;

    @NotNull
<<<<<<< HEAD
    private Long landlordId;

    @NotNull
=======
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

    @NotNull
    private Long monthlyRent;

    @NotNull
    private Long deposit;

    @NotNull
    @Min(1)
    @Max(31)
    private Integer paymentDay;

    private String bankAccount;
}
