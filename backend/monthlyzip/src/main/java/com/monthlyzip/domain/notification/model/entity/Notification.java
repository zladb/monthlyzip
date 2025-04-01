package com.monthlyzip.domain.notification.model.entity;

import com.monthlyzip.domain.notification.model.type.NotificationType;
import com.monthlyzip.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
@Entity
@Table(name = "notification")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id") // ✅ DB 컬럼명과 일치시킴!
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private Member receiver;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private NotificationType type;

    @Column(nullable = false)
    private String message;

    private String redirectUrl;

    @Column(name = "is_read")
    private boolean isRead;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public void markAsRead() {
        this.isRead = true;
    }
}
