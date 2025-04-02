package com.monthlyzip.domain.notification.model.dto;

import com.monthlyzip.domain.notification.model.entity.Notification;
import com.monthlyzip.domain.notification.model.type.NotificationType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationResponseDto {
    private Long id;
    private NotificationType type;
    private String message;
    private String redirectUrl;
    private boolean isRead;
    private LocalDateTime createdAt;

    public static NotificationResponseDto of(Notification notification) {
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .type(notification.getType())
                .message(notification.getMessage())
                .redirectUrl(notification.getRedirectUrl())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
