package com.monthlyzip.domain.auth.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKeyResponse {
    private String userId;
    private String userName;
    private String institutionCode;
    private String userKey;
    private String created;
    private String modified;
}
