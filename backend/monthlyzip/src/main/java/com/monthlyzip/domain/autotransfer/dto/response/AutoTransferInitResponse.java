package com.monthlyzip.domain.autotransfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AutoTransferInitResponse {
    private Long contractId;
    private String fromAccount;
    private String toAccount;
}