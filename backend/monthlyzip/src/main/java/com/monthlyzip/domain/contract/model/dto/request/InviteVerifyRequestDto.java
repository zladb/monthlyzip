package com.monthlyzip.domain.contract.model.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InviteVerifyRequestDto {
    private String code;
    private Long tenantId;
}
