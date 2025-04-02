package com.monthlyzip.domain.auth.model.dto;

import com.monthlyzip.domain.member.enums.MemberType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JoinDto {

    private String email;
    private String password;
    private String confirmPassword;
    private String name;
    private String phoneNumber;
    private MemberType memberType;
}