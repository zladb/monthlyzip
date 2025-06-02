package com.monthlyzip.domain.notification.repository;

import com.monthlyzip.domain.notification.model.entity.Notification;
<<<<<<< HEAD
import com.monthlyzip.member.model.entity.Member;
=======
import com.monthlyzip.domain.member.entity.Member;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverOrderByCreatedAtDesc(Member receiver);
}
