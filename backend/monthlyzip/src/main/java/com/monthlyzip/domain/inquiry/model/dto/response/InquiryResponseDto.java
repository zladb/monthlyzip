package com.monthlyzip.domain.inquiry.model.dto.response;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.member.model.entity.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class InquiryResponseDto {
    private Long inquiryId;
    private Long memberId;
    private String memberName;
    private Long contractId;
    private String roomAddress;
    private String inquiryType;
    private String title;
    private String status;
    private LocalDateTime createdAt;

    public static InquiryResponseDto from(Inquiry inquiry) {
        return InquiryResponseDto.builder()
            .inquiryId(inquiry.getId())
            .memberId(inquiry.getMember().getId())
            .memberName(inquiry.getMember().getName())
            .contractId(inquiry.getContract().getId())
            .roomAddress(inquiry.getContract().getRoom().getDetailAddress())
            .inquiryType(inquiry.getInquiryType())
            .title(inquiry.getTitle())
            .status(inquiry.getStatus())
            .createdAt(inquiry.getCreatedAt())
            .build();
    }
}
