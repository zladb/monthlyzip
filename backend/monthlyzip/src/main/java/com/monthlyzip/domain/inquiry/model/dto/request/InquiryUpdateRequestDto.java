package com.monthlyzip.domain.inquiry.model.dto.request;

import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
<<<<<<< HEAD
=======
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class InquiryUpdateRequestDto {
    private InquiryStatus status;
<<<<<<< HEAD
=======
    private InquiryType inquiryType;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    private String title;
    private String content;
}
