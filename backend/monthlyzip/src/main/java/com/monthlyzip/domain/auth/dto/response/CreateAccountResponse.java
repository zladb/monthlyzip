package com.monthlyzip.domain.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountResponse {

    @JsonProperty("Header")
    private Header header;
    @JsonProperty("REC")
    private Rec rec;

    @Getter
    @Setter
    public static class Header {
        private String responseCode;
        private String responseMessage;
        private String accountNo;
        // 생략 가능 필드
    }

    @Getter
    @Setter
    public static class Rec {
        private String bankCode;
        private String accountNo;
        private Currency currency;
    }

    @Getter
    @Setter
    public static class Currency {
        private String currency;
        private String currencyName;
    }
}
