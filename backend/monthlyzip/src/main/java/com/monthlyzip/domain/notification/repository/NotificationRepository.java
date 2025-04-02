package com.monthlyzip.domain.notification.repository;

import com.monthlyzip.domain.notification.model.entity.Notification;
import com.monthlyzip.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverOrderByCreatedAtDesc(Member receiver);
}
