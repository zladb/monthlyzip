package com.monthlyzip.domain.notification.model.dto;

import com.monthlyzip.domain.notification.model.entity.Notification;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationSocketDto {
    private String message;
    private String redirectUrl;
    private LocalDateTime createdAt;

    public static NotificationSocketDto of(Notification notification) {
        return NotificationSocketDto.builder()
                .message(notification.getMessage())
                .redirectUrl(notification.getRedirectUrl())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
