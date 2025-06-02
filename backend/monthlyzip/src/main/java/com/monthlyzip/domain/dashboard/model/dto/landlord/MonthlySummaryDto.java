package com.monthlyzip.domain.dashboard.model.dto.landlord;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySummaryDto {
    private Long currentMonthIncome;
    private Long occupiedRooms;
    private Long paymentOverdue;
}