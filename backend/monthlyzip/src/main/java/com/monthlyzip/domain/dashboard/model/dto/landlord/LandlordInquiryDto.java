package com.monthlyzip.domain.dashboard.model.dto.landlord;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LandlordInquiryDto {
    private Long inquiryId;
    private String type;
    private String title;
    private String roomInfo;
    private String createdAt;
    private Boolean isNew;
    private String status;
}