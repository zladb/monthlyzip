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
    INVALID_JSON(false, HttpStatus.BAD_REQUEST, 400, "요청 본문(JSON)이 올바른 형식이 아닙니다."),
    MISSING_REQUEST_PARAMETER(false, HttpStatus.BAD_REQUEST, 4001, "요청 파라미터가 누락되었습니다."),


    // ✅ 비즈니스 예외

    // member
    EMAIL_DUPLICATE(false, HttpStatus.CONFLICT, 400, "중복된 이메일입니다."),
    PASSWORD_INVALID(false, HttpStatus.BAD_REQUEST, 400, "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."),
    PASSWORD_MISMATCH(false, HttpStatus.BAD_REQUEST, 400, "비밀번호가 일치하지 않습니다."),
    LOGIN_ERROR(false, HttpStatus.BAD_REQUEST, 500, "로그인 과정 중 서버 오류가 생겼습니다."),
    MEMBER_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 사용자가 존재하지 않습니다."),
    TOKEN_EXPIRED(false, HttpStatus.UNAUTHORIZED, 401, "로그인 세션이 만료되었습니다. 다시 로그인해주세요."),
    INVALID_ROLE(false, HttpStatus.FORBIDDEN, 403, "허용되지 않은 기능입니다."),

    // building
    BUILDING_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 건물이 존재하지 않습니다."),
    OWNER_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 소유자가 존재하지 않습니다."),

    // room
    ROOM_DUPLICATE(false, HttpStatus.CONFLICT, 409, "이미 존재하는 세대 정보입니다."),
    ROOM_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 세대가 존재하지 않습니다."),

    // contract
    CONTRACT_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 임대차 계약이 존재하지 않습니다."),
    INVITE_CODE_INVALID(false, HttpStatus.BAD_REQUEST, 400, "유효하지 않은 초대 코드입니다."),
    INVITE_CODE_EXPIRED(false, HttpStatus.GONE, 410, "초대 코드가 만료되었습니다."),
    CONTRACT_ALREADY_CONNECTED(false, HttpStatus.CONFLICT, 409, "이미 연결된 계약입니다."),
    CONTRACT_ACCESS_DENIED(false, HttpStatus.FORBIDDEN, 403, "해당 계약에 접근할 수 없습니다."),


    // payment
    PAYMENT_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 납부 내역을 찾을 수 없습니다."),

    // notice
    NOTICE_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 공지사항이 존재하지 않습니다."),
    NOTICE_ACCESS_DENIED(false, HttpStatus.FORBIDDEN, 403, "공지사항에 접근할 권한이 없습니다."),
    NOTICE_INVALID_REQUEST(false, HttpStatus.BAD_REQUEST, 400, "공지사항 요청 값이 유효하지 않습니다."),
    NOTICE_NO_AUTHORITY(false,HttpStatus.UNAUTHORIZED, 403, "해당 건물에 대한 권한이 없습니다."),


    // notification
    NOTIFICATION_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 알림을 찾을 수 없습니다."),
    NOTIFICATION_ACCESS_DENIED(false, HttpStatus.FORBIDDEN, 403, "해당 알림에 접근할 수 없습니다."),

    // inquiry
    INQUIRY_NOT_FOUND(false, HttpStatus.NOT_FOUND, 404, "해당 문의가 존재하지 않습니다."),
    INQUIRY_INVALID_REQUEST(false, HttpStatus.BAD_REQUEST, 400, "유효하지 않는 문의 유형 입니다."),

    // file
    FILE_SAVE_FAILED(false, HttpStatus.INTERNAL_SERVER_ERROR, 5001,"파일 저장에 실패했습니다."),
    FILE_DELETE_FAILED(false, HttpStatus.INTERNAL_SERVER_ERROR, 5002,"파일 삭제에 실패했습니다.")

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
