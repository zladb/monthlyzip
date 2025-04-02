package com.monthlyzip.domain.inquiry.model.entity;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import com.monthlyzip.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private InquiryStatus status;  // 문의 상태: 접수, 처리중, 처리완료

    @ElementCollection
    @CollectionTable(name = "inquiry_images", joinColumns = @JoinColumn(name = "inquiry_id"))
    @Column(name = "image_url")
    private List<String> imageUrls = new ArrayList<>();

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;
}
