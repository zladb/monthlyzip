package com.monthlyzip.domain.notification.controller;

import com.monthlyzip.domain.notification.model.dto.NotificationResponseDto;
import com.monthlyzip.domain.notification.model.dto.request.NotificationRequestDto;
import com.monthlyzip.domain.notification.service.NotificationService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    // 🔔 알림 전체 조회 (유저별)
    @GetMapping
    public ApiResponse<List<NotificationResponseDto>> getMyNotifications(
            @RequestParam("memberId") @NotNull Long memberId
    ) {
        log.info("📥 알림 컨트롤러 진입! memberId={}", memberId);
        return ApiResponse.success(notificationService.getNotifications(memberId));
    }

    // ✅ 알림 읽음 처리
    @PatchMapping("/{id}/read")
    public ApiResponse<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ApiResponse.success();
    }

    // ❌ 알림 삭제
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ApiResponse.success();
    }

    // 🧪 테스트용 알림 전송 (receiverId 하드코딩 or 입력값)
    @PostMapping("/test")
    public ApiResponse<Void> sendTest(
            @RequestParam("receiverId") Long receiverId,
            @RequestBody NotificationRequestDto request
    ) {
        notificationService.sendCustomNotification(receiverId, request);
        return ApiResponse.success();
    }
}
