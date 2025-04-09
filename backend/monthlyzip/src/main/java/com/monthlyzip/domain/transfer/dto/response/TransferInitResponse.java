package com.monthlyzip.domain.transfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransferInitResponse {
    private String landlordAccount;
    private String landlordName;
    private String tenantAccount;
    private String tenantName;
}