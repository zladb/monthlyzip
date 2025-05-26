package com.monthlyzip.domain.tenant.model.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantSummaryResponseDto {
    private Long roomId;
    private String roomNumber;
    private String tenantName;
    private Long monthlyRent;
    private LocalDateTime contractStart;
    private LocalDateTime contractEnd;
}