package com.monthlyzip.global.common.model.dto;

import org.springframework.http.HttpStatus;
import lombok.Getter;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
public enum ApiResponseStatus {
    // ✅ 공통
    SUCCESS(true, HttpStatus.OK, 200, "요청에 성공하였습니다."),
    BAD_REQUEST(false, HttpStatus.BAD_REQUEST, 400, "입력값을 확인해주세요."),
    UNAUTHORIZED(false, HttpStatus.UNAUTHORIZED, 401, "인증이 필요합니다."),
    FORBIDDEN(false, HttpStatus.FORBIDDEN, 403, "권한이 없습니다."),
    NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "대상을 찾을 수 없습니다."),

    // ✅ 비즈니스 예외
    // building
    BUILDING_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 건물이 존재하지 않습니다."),
    OWNER_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 소유자가 존재하지 않습니다."),

    // room
    ROOM_DUPLICATE(false, HttpStatus.CONFLICT, 409, "이미 존재하는 세대 정보입니다."),
    ROOM_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 세대가 존재하지 않습니다.")
    ;

    private final boolean isSuccess;
    @JsonIgnore
    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    ApiResponseStatus(boolean isSuccess, HttpStatus httpStatus, int code, String message) {
        this.isSuccess = isSuccess;
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }
}
