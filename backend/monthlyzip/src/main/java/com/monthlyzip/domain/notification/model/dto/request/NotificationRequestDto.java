package com.monthlyzip.domain.notification.model.dto.request;

import com.monthlyzip.domain.notification.model.type.NotificationType;
import lombok.Getter;

@Getter
public class NotificationRequestDto {
    private NotificationType type;
    private String message;
}
