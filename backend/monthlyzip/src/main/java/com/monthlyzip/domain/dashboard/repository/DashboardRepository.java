package com.monthlyzip.domain.dashboard.repository;

import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordDashboardData;
import com.monthlyzip.domain.dashboard.model.dto.landlord.LandlordInquiryDto;
import com.monthlyzip.domain.dashboard.model.dto.tenant.TenantDashboardData;
import com.monthlyzip.domain.dashboard.model.dto.tenant.TenantInquiryDto;
import com.monthlyzip.member.model.entity.Member;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<Member, Long> {

    // 임대인 최근 문의 조회
    @Query(value = "SELECT " +
        "i.inquiry_id AS inquiryId, " +
        "i.inquiry_type AS type, " +
        "i.title, " +
        "r.detail_address AS roomInfo, " +
        "DATE_FORMAT(i.created_at, '%Y-%m-%d') AS createdAt, " +
        "FALSE AS isNew, " +
        "i.status " +
        "FROM inquiry i " +
        "JOIN contract c ON i.contract_id = c.contract_id " +
        "JOIN room r ON c.room_id = r.room_id " +
        "WHERE c.landlord_id = :landlordId " +
        "ORDER BY i.created_at DESC",
        nativeQuery = true)
    List<Map<String, Object>> findRecentInquiriesByLandlordId(@Param("landlordId") Long landlordId);

    // 임차인 문의 목록 조회
    @Query(value = "SELECT " +
        "i.inquiry_id AS id, " +
        "i.inquiry_type AS inquiryType, " +
        "i.title, " +
        "DATE_FORMAT(i.created_at, '%Y-%m-%d') AS createdAt, " +
        "FALSE AS isRead " +
        "FROM inquiry i " +
        "JOIN contract c ON i.contract_id = c.contract_id " +
        "WHERE c.tenant_id = :tenantId " +
        "ORDER BY i.created_at DESC",
        nativeQuery = true)
    List<Map<String, Object>> findInquiriesByTenantId(@Param("tenantId") Long tenantId);

    // 임대인 대시보드 데이터 조회
    @Query(value = "SELECT " +
        "COALESCE(SUM(c.monthly_rent), 0) AS currentMonthIncome, " +
        "COALESCE(COUNT(DISTINCT r.room_id), 0) AS occupiedRooms, " +
        "COALESCE(COUNT(DISTINCT p.payment_id), 0) AS paymentOverdue " +
        "FROM contract c " +
        "LEFT JOIN room r ON c.room_id = r.room_id " +
        "LEFT JOIN payment p ON p.contract_id = c.contract_id " +
        "WHERE c.landlord_id = :landlordId " +
        "AND r.is_occupied = true " +
        "AND (p.payment_id IS NULL OR p.payment_status = '미납')",
        nativeQuery = true)
    Map<String, Object> getLandlordDashboardData(@Param("landlordId") Long landlordId);

    // 임차인 다음 납부 정보 조회
    @Query(value = "SELECT " +
        "DATE(p.due_date) AS dueDate, " +
        "c.monthly_rent AS monthlyRent, " +
        "(SELECT COUNT(*) FROM payment op WHERE op.contract_id = c.contract_id AND op.payment_status = '미납') AS paymentOverdue " +
        "FROM payment p " +
        "JOIN contract c ON p.contract_id = c.contract_id " +
        "WHERE c.tenant_id = :tenantId AND p.payment_status = '확인중' " +
        "ORDER BY p.due_date ASC LIMIT 1",
        nativeQuery = true)
    Map<String, Object> getTenantDashboardData(@Param("tenantId") Long tenantId);
}
