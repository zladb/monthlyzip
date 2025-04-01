package com.monthlyzip.domain.notification.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.notification.model.dto.NotificationResponseDto;
import com.monthlyzip.domain.notification.model.entity.Notification;
import com.monthlyzip.domain.notification.model.type.NotificationType;
import com.monthlyzip.domain.notification.repository.NotificationRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.member.model.entity.Member;
import com.monthlyzip.member.repository.MemberRepository;
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

    public void sendTestNotification(Long receiverId) {
        Member member = memberRepository.findById(receiverId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        Notification notification = Notification.builder()
                .receiver(member)
                .type(NotificationType.NEW_NOTICE)
                .message("📢 테스트 알림입니다.")
                .redirectUrl("/notices")
                .isRead(false)
                .build();

        notificationRepository.save(notification);
        socketService.sendNotification(member.getId(), notification);
    }

}
