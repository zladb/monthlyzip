package com.monthlyzip.global.common.exception.handler;

import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice  // ✅ 모든 컨트롤러에서 발생하는 예외를 감지
@Order(0)  // ✅ 예외 핸들링의 최우선순위 적용
public class GlobalExceptionHandler {

    // ✅ BusinessException 예외 처리
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException e) {
        log.error("BusinessException 발생: {}", e.getMessage());

        return ResponseEntity.status(e.getApiResponseStatus().getHttpStatus())
                .body(ApiResponse.fail(e.getApiResponseStatus()));
    }

    // ✅ 잘못된 요청 예외 처리 (예: 입력값 검증 실패)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("잘못된 요청 예외 발생: {}", e.getMessage());

        return ResponseEntity.badRequest()
                .body(ApiResponse.fail(400, e.getMessage()));
    }

    // ✅ 예상치 못한 예외 처리 (서버 오류)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception e) {
        log.error("알 수 없는 예외 발생: {}", e.getMessage(), e);

        return ResponseEntity.internalServerError()
                .body(ApiResponse.fail(500, "서버 오류가 발생했습니다."));
    }
}
