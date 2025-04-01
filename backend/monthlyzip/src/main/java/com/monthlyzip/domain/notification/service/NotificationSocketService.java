package com.monthlyzip.domain.notification.service;

import com.monthlyzip.domain.notification.model.entity.Notification;
import com.monthlyzip.domain.notification.model.dto.NotificationSocketDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotification(Long userId, Notification notification) {
        NotificationSocketDto dto = NotificationSocketDto.of(notification);
        messagingTemplate.convertAndSend("/topic/notify/" + userId, dto);
    }
}
