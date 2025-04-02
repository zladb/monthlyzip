package com.monthlyzip.domain.dashboard.model.dto.response;

import com.monthlyzip.domain.auth.model.enums.MemberType;
import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordInfoDto;
import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordInquiryDto;
import com.monthlyzip.domain.dashboard.model.dto.landlord.MonthlySummaryDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.NextPaymentDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.NoticeDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.TenantInfoDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class DashboardResponseDto {
    // 공통 필드
    private MemberType memberType;

    // 임대인 전용 필드
    private LandlordInfoDto landlordInfo;
    private MonthlySummaryDto monthlySummary;
    private List<LandlordInquiryDto> recentInquiries;

    // 임차인 전용 필드
    private TenantInfoDto tenantInfo;
    private NextPaymentDto nextPayment;
    private List<NoticeDto> notices; // inquiries 대신 notices로 변경
}
