package com.monthlyzip.domain.dashboard.model.dto.tenant;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantDashboardData {
    private LocalDate dueDate;
    private Long monthlyRent;
    private Long paymentOverdue;

}