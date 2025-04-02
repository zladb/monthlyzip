package com.monthlyzip.domain.member.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum MemberType {
    임대인, 임차인;

    @JsonCreator
    public static MemberType from(String value) {
        for (MemberType type : MemberType.values()) {
            if (type.name().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown MemberType: " + value);
    }
}
