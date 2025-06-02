package com.monthlyzip.domain.transfer.dto.request;

import lombok.Getter;

@Getter
public class TransferRequest {

    private String landlordAccount;
    private String tenantAccount;
    private Long amount;
}
