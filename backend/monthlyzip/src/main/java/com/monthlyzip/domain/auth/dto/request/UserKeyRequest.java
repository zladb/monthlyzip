package com.monthlyzip.domain.auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKeyRequest {
    private String apiKey;
    private String userId;
}