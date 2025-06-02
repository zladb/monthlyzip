package com.monthlyzip.domain.inquiry.model.dto.request;

import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
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
    private InquiryType inquiryType;
    private String title;
    private String content;
}
