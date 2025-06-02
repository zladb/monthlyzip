package com.monthlyzip.domain.inquiry.model.dto.response;

<<<<<<< HEAD
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import com.monthlyzip.member.model.entity.Member;
import java.time.LocalDateTime;
=======
import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import java.util.List;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
=======
import java.time.LocalDateTime;

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
=======
    private String imageUrl;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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
<<<<<<< HEAD
=======
            .imageUrl(inquiry.getImageUrl())  // 추가
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
            .createdAt(inquiry.getCreatedAt())
            .build();
    }
}
