package com.monthlyzip.domain.dashboard.service;

import com.monthlyzip.domain.auth.model.enums.MemberType;
import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordInfoDto;
import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordInquiryDto;
import com.monthlyzip.domain.dashboard.model.dto.landlord.MonthlySummaryDto;
import com.monthlyzip.domain.dashboard.model.dto.response.DashboardResponseDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.NextPaymentDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.NoticeDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.TenantInfoDto;
import com.monthlyzip.domain.dashboard.repository.DashboardRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import com.monthlyzip.member.model.entity.Member;
import com.monthlyzip.member.model.entity.UserType;
import com.monthlyzip.member.repository.MemberRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public DashboardResponseDto getMainDashboard(Long memberId) {
        // 1. 회원 정보 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 2. 회원 유형에 따라 다른 대시보드 정보 반환
        if (member.getUserType().equals(UserType.임대인)) {
            return createLandlordDashboard(member);
        } else {
             return createTenantDashboard(member);
        }
    }

    private DashboardResponseDto createLandlordDashboard(Member landlord) {
        // 1. 임대인 정보
        LandlordInfoDto landlordInfo = LandlordInfoDto.builder()
            .name(landlord.getName())
            .build();

        // 2. 대시보드 데이터 조회
        Map<String, Object> dashboardData = dashboardRepository.getLandlordDashboardData(landlord.getId());

        MonthlySummaryDto monthlySummary = MonthlySummaryDto.builder()
            .currentMonthIncome(((Number) dashboardData.get("currentMonthIncome")).longValue())
            .occupiedRooms(((Number) dashboardData.get("occupiedRooms")).longValue())
            .paymentOverdue(((Number) dashboardData.get("paymentOverdue")).longValue())
            .build();

        // 3. 최근 문의 목록
        List<Map<String, Object>> inquiryData = dashboardRepository.findRecentInquiriesByLandlordId(landlord.getId());
        List<LandlordInquiryDto> recentInquiries = new ArrayList<>();

        for (Map<String, Object> data : inquiryData) {
            LandlordInquiryDto inquiry = LandlordInquiryDto.builder()
                .inquiryId(((Number) data.get("inquiryId")).longValue())
                .type((String) data.get("type"))
                .title((String) data.get("title"))
                .roomInfo((String) data.get("roomInfo"))
                .createdAt((String) data.get("createdAt"))
                .status((String) data.get("status"))
                .build();
            recentInquiries.add(inquiry);
        }

        // 4. 최종 응답 생성
        return DashboardResponseDto.builder()
            .memberType(MemberType.임대인)
            .landlordInfo(landlordInfo)
            .monthlySummary(monthlySummary)
            .recentInquiries(recentInquiries)
            .build();
    }

    private DashboardResponseDto createTenantDashboard(Member tenant) {
        // 1. 임차인 정보
        TenantInfoDto tenantInfo = TenantInfoDto.builder()
            .name(tenant.getName())
            .build();

        // 2. 다음 납부 정보
        Map<String, Object> dashboardData = dashboardRepository.getTenantDashboardData(tenant.getId());

        NextPaymentDto nextPayment = NextPaymentDto.builder()
            .paymentDate(formatDate(((java.sql.Date) dashboardData.get("dueDate")).toLocalDate()))
            .amount(((Number) dashboardData.get("monthlyRent")).longValue())
            .paymentOverdue(((Number) dashboardData.get("paymentOverdue")).longValue())
            .build();

        // 3. 공지사항 목록 (문의 목록 대신)
        List<Map<String, Object>> noticeData = dashboardRepository.findRecentNoticesByTenantId(tenant.getId());
        List<NoticeDto> notices = new ArrayList<>();

        for (Map<String, Object> data : noticeData) {
            NoticeDto notice = NoticeDto.builder()
                .noticeId(((Number) data.get("notice_id")).longValue())
                .title((String) data.get("title"))
                .createdAt((String) data.get("created_at"))
                .build();
            notices.add(notice);
        }

        // 4. 최종 응답 생성
        return DashboardResponseDto.builder()
            .memberType(MemberType.임차인)
            .tenantInfo(tenantInfo)
            .nextPayment(nextPayment)
            .notices(notices)
            .build();
    }

    private String formatDate(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern("yyyy년 M월 d일"));
    }
}
