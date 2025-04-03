package com.monthlyzip.domain.member.entity;

import com.monthlyzip.domain.member.enums.MemberType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "member")  // 기존 테이블과 매칭
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT 적용
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "profile_image_url", length = 100)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)  // ENUM을 String(VARCHAR)으로 저장
    @Column(name = "user_type", nullable = false)
    private MemberType memberType;

    @CreationTimestamp  // 생성 시 자동으로 현재 시간 입력
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp  // 업데이트 시 자동으로 현재 시간 갱신
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    // ✅ 역할 확인 메서드
    public boolean isLandlord() {
        return this.memberType == MemberType.임대인;
    }

    public boolean isTenant() {
        return this.memberType == MemberType.임차인;
    }

}
