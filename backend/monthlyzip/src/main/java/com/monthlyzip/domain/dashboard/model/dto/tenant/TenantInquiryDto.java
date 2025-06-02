package com.monthlyzip.domain.dashboard.model.dto.tenant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantInquiryDto {
    private Long id;           // inquiryId 대신
    private String inquiryType; // type 대신
    private String title;
    private String createdAt;
    private Boolean isRead;
}