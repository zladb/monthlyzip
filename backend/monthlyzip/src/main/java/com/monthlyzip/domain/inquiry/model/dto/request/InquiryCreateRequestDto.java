package com.monthlyzip.domain.inquiry.model.dto.request;


import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InquiryCreateRequestDto {

    @NotNull(message = "문의 유형은 필수입니다")
    private InquiryType inquiryType;

    @NotBlank(message = "제목은 필수입니다")
    private String title;

    @NotBlank(message = "내용은 필수입니다")
    private String content;
}
