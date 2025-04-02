package com.monthlyzip.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {
    private String profileImageUrl;
    private String userType;
    private String email;
    private String name;
    private String phoneNumber;
}