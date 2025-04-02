package com.monthlyzip.domain.inquiry.model.dto.response;

import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class InquiryDetailResponseDto {
    private Long inquiryId;
    // private Long memberId;
    // private String memberName;
    private Long contractId;
    // private String roomAddress;
    private InquiryType inquiryType;
    private String title;
    private String content;
    private InquiryStatus status;
    private List<String> imageUrls;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InquiryDetailResponseDto from(Inquiry inquiry) {
        return InquiryDetailResponseDto.builder()
            .inquiryId(inquiry.getId())
            // .memberId(inquiry.getMember().getId())
            // .memberName(inquiry.getMember().getName())
            .contractId(inquiry.getContract().getId())
            // .roomAddress(inquiry.getContract().getRoom().getDetailAddress())
            .inquiryType(inquiry.getInquiryType())
            .title(inquiry.getTitle())
            .content(inquiry.getContent())
            .status(inquiry.getStatus())
            .imageUrls(inquiry.getImageUrls())  // 추가
            .createdAt(inquiry.getCreatedAt())
            .updatedAt(inquiry.getUpdatedAt())
            .build();
    }
}
