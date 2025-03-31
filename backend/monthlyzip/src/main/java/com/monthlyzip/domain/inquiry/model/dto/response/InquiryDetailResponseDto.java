package com.monthlyzip.domain.inquiry.model.dto.response;

import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import java.time.LocalDateTime;
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
    private Long memberId;
    private String memberName;
    private Long contractId;
    private String roomAddress;
    private String inquiryType;
    private String title;
    private String content;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InquiryDetailResponseDto from(Inquiry inquiry) {
        return InquiryDetailResponseDto.builder()
            .inquiryId(inquiry.getId())
            .memberId(inquiry.getMember().getId())
            .memberName(inquiry.getMember().getName())
            .contractId(inquiry.getContract().getId())
            .roomAddress(inquiry.getContract().getRoom().getDetailAddress())
            .inquiryType(inquiry.getInquiryType())
            .title(inquiry.getTitle())
            .content(inquiry.getContent())
            .status(inquiry.getStatus())
            .createdAt(inquiry.getCreatedAt())
            .updatedAt(inquiry.getUpdatedAt())
            .build();
    }
}
