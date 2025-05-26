package com.monthlyzip.domain.autotransfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AutoTransferInitResponse {
    private Long contractId;
    private String fromAccount;
    private String toAccount;
}