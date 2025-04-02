package com.monthlyzip.domain.dashboard.model.dto.tenant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDto {
    private Long noticeId;
    private String title;
    private String createdAt;
}