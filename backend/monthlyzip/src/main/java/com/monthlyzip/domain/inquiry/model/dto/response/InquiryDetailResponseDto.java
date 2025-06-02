package com.monthlyzip.domain.inquiry.model.dto.response;

import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import java.time.LocalDateTime;
<<<<<<< HEAD
=======
import java.util.List;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
    // private Long memberId;
    // private String memberName;
    private Long contractId;
    // private String roomAddress;
=======
    private Long contractId;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    private InquiryType inquiryType;
    private String title;
    private String content;
    private InquiryStatus status;
<<<<<<< HEAD
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static InquiryDetailResponseDto from(Inquiry inquiry) {
        return InquiryDetailResponseDto.builder()
            .inquiryId(inquiry.getId())
            // .memberId(inquiry.getMember().getId())
            // .memberName(inquiry.getMember().getName())
            .contractId(inquiry.getContract().getId())
            // .roomAddress(inquiry.getContract().getRoom().getDetailAddress())
=======
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 임차인 정보
    private Long tenantId;
    private String tenantName;
    private String tenantProfileUrl;

    // 건물/방 정보
    private String buildingName;
    private String roomNumber;

    public static InquiryDetailResponseDto from(Inquiry inquiry) {
        return InquiryDetailResponseDto.builder()
            .inquiryId(inquiry.getId())
            .contractId(inquiry.getContract().getId())
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
            .inquiryType(inquiry.getInquiryType())
            .title(inquiry.getTitle())
            .content(inquiry.getContent())
            .status(inquiry.getStatus())
<<<<<<< HEAD
            .createdAt(inquiry.getCreatedAt())
            .updatedAt(inquiry.getUpdatedAt())
=======
            .imageUrl(inquiry.getImageUrl())  // 추가
            .createdAt(inquiry.getCreatedAt())
            .updatedAt(inquiry.getUpdatedAt())
            // 임차인 정보
            .tenantId(inquiry.getMember().getId())
            .tenantName(inquiry.getMember().getName())
            .tenantProfileUrl(inquiry.getMember().getProfileImageUrl())
            // 건물/방 정보
            .buildingName(inquiry.getContract().getRoom().getBuilding().getBuildingName())
            .roomNumber(inquiry.getContract().getRoom().getDetailAddress())
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
            .build();
    }
}
