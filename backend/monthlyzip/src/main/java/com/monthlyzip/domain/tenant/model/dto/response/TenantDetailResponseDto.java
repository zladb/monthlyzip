package com.monthlyzip.domain.tenant.model.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantDetailResponseDto {

    private String roomNumber;

    private TenantInfo tenant;
    private ContractInfo contract;

    private List<PaymentInfo> paymentHistory;

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TenantInfo {
        private String name;
        private String phoneNumber;
        private String bankAccount;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ContractInfo {
        private Long deposit;
        private Long monthlyRent;
        private String contractStart; // 포맷 적용
        private String contractEnd;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class PaymentInfo {
        private String date;
        private Long amount;
        private String status;
    }
}
