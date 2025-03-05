
package com.fintech.global.common.exception.handler;

import com.fintech.global.common.exception.exception.BusinessException;
import com.fintech.global.common.model.dto.BaseResponse;
import com.fintech.global.common.model.dto.BaseResponseStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(0)
@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {
    private static final Logger LOG = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<BaseResponse<BaseResponseStatus>> handleBusinessException(BusinessException e) {
        LOG.error("BusinessException occurred: {}", e.getMessage());
        return ResponseEntity.status(e.getBaseResponseStatus().getHttpStatus())
            .body(new BaseResponse<>(e.getBaseResponseStatus()));
    }

}
