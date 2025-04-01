package com.monthlyzip.domain.dashboard.model.dto.tenant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantInfoDto {
    private String name;
    // private String profileImageUrl;
}