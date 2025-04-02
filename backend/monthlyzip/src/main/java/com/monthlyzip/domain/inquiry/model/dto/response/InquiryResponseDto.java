package com.monthlyzip.domain.inquiry.model.dto.response;

import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class InquiryResponseDto {
    private Long inquiryId;
    // private Long memberId;
    // private String memberName;
    private Long contractId;
    // private String roomAddress;
    private InquiryType inquiryType;
    private String title;
    private InquiryStatus status;
    private LocalDateTime createdAt;

    public static InquiryResponseDto from(Inquiry inquiry) {
        return InquiryResponseDto.builder()
            .inquiryId(inquiry.getId())
            // .memberId(inquiry.getMember().getId())
            //.memberName(inquiry.getMember().getName())
            .contractId(inquiry.getContract().getId())
            // .roomAddress(inquiry.getContract().getRoom().getDetailAddress())
            .inquiryType(inquiry.getInquiryType())
            .title(inquiry.getTitle())
            .status(inquiry.getStatus())
            .createdAt(inquiry.getCreatedAt())
            .build();
    }
}
