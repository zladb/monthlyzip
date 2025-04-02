package com.monthlyzip.domain.member.dto.request;

import lombok.Getter;

@Getter
public class UpdatePasswordRequest {

    private String password;
    private String confirmPassword;
}