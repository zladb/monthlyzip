package com.monthlyzip.global.common.exception.exception;

import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.Getter;

@Getter
public class FileStorageException extends RuntimeException {
    private final ApiResponseStatus status;

    public FileStorageException(ApiResponseStatus status, Throwable cause) {
        super(status.getMessage(), cause);
        this.status = status;
    }
}