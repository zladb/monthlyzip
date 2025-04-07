package com.monthlyzip.domain.auth.dto.request;

import lombok.Getter;

@Getter
public class LoginDto {
    public String email;
    public String password;
}
