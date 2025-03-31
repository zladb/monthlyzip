package com.monthlyzip.domain.inquiry.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class InquiryUpdateRequestDto {
    private String status;
    private String title;
    private String content;
}
