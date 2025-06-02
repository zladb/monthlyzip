package com.monthlyzip.domain.notification.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.notification.model.dto.NotificationResponseDto;
import com.monthlyzip.domain.notification.model.dto.request.NotificationRequestDto;
import com.monthlyzip.domain.notification.model.entity.Notification;
import com.monthlyzip.domain.notification.model.type.NotificationType;
import com.monthlyzip.domain.notification.repository.NotificationRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final ContractRepository contractRepository;
    private final MemberRepository memberRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationSocketService socketService;

    public void sendNoticeToTenants(Long buildingId, String title, String redirectUrl) {
        List<Contract> contracts = contractRepository.findByRoom_Building_IdAndTenantIdIsNotNull(buildingId);

        for (Contract contract : contracts) {
            Long tenantId = contract.getTenantId();
            Member tenant = memberRepository.findById(tenantId)
                    .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

            Notification notification = Notification.builder()
                    .receiver(tenant)
                    .type(NotificationType.NEW_NOTICE)
                    .message("📢 " + title)
                    .redirectUrl(redirectUrl)
                    .isRead(false)
                    .build();

            notificationRepository.save(notification);
            socketService.sendNotification(tenant.getId(), notification);
        }
    }

    public List<NotificationResponseDto> getNotifications(Long receiverId) {
        Member member = memberRepository.findById(receiverId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        return notificationRepository.findByReceiverOrderByCreatedAtDesc(member)
                .stream()
                .map(NotificationResponseDto::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long id) {
        Notification noti = notificationRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.NOTIFICATION_NOT_FOUND));

        noti.markAsRead();
    }

    @Transactional
    public void delete(Long id) {
        if (!notificationRepository.existsById(id)) {
            throw new BusinessException(ApiResponseStatus.NOTIFICATION_NOT_FOUND);
        }
        notificationRepository.deleteById(id);
    }

    public void sendCustomNotification(Long receiverId, NotificationRequestDto request) {
        Member member = memberRepository.findById(receiverId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // ✅ 메시지가 없으면 기본 메시지 사용
        String message = (request.getMessage() == null || request.getMessage().isBlank())
                ? request.getType().getDefaultMessage()
                : request.getMessage();

        Notification notification = Notification.builder()
                .receiver(member)
                .type(request.getType())
                .message(message)
                .redirectUrl(null)
                .isRead(false)
                .build();

        notificationRepository.save(notification);
        socketService.sendNotification(member.getId(), notification);
    }



}
