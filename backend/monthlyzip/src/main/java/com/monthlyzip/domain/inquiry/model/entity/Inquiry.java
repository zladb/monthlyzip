package com.monthlyzip.domain.inquiry.model.entity;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
<<<<<<< HEAD
import com.monthlyzip.member.model.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
=======
import com.monthlyzip.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

@Entity
@Table(name = "inquiry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InquiryType inquiryType;  // 문의 유형: 수리요청, 납부관리, 계약관리, 생활민원, 기타

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
<<<<<<< HEAD
    private InquiryStatus status;  // 문의 상태: 접수, 처리중, 처리완료
=======
    private InquiryStatus status;  // 문의 상태: 접수대기, 처리중, 처리완료

    // 단일 String으로 변경 현재는 이미지 하나만
    @Column(name = "image_url")
    private String imageUrl;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;
}
