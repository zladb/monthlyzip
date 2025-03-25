package com.monthlyzip.global.common.exception.handler;

import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(0)
public class GlobalExceptionHandler {

    // ✅ 비즈니스 예외 처리 (AOP에서 이미 로그 출력됨)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException e) {
        return ResponseEntity.status(e.getApiResponseStatus().getHttpStatus())
                .body(ApiResponse.fail(e.getApiResponseStatus()));
    }

    // ✅ 잘못된 요청 예외 처리 (예: 입력값 검증 실패)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(ApiResponse.fail(400, e.getMessage()));
    }

    // ✅ 예상치 못한 예외 처리 (서버 내부 오류)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception e) {
        return ResponseEntity.internalServerError()
                .body(ApiResponse.fail(500, "서버 오류가 발생했습니다."));
    }
}
