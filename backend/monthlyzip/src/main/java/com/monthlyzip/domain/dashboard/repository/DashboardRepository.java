package com.monthlyzip.domain.dashboard.repository;

import com.monthlyzip.member.model.entity.Member;
import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<Member, Long> {

    // 임대인 대시보드 데이터 조회
    @Query(value = """
        SELECT
            COALESCE((
                SELECT SUM(p.amount)
                FROM payment p
                JOIN contract c2 ON p.contract_id = c2.contract_id
                WHERE c2.landlord_id = :landlordId
                AND p.payment_status = '납부완료'
                AND YEAR(p.payment_date) = YEAR(CURDATE())
                AND MONTH(p.payment_date) = MONTH(CURDATE())
            ), 0) AS currentMonthIncome,
            COALESCE(COUNT(DISTINCT r.room_id), 0) AS occupiedRooms,
            COALESCE((
                SELECT COUNT(*)
                FROM payment p
                JOIN contract c3 ON p.contract_id = c3.contract_id
                WHERE c3.landlord_id = :landlordId
                AND p.payment_status = '미납'
            ), 0) AS paymentOverdue
        FROM contract c
            LEFT JOIN room r ON c.room_id = r.room_id
        WHERE c.landlord_id = :landlordId
        AND r.is_occupied = true
    """, nativeQuery = true)
    Map<String, Object> getLandlordDashboardData(@Param("landlordId") Long landlordId);

    // 임대인 최근 문의 조회
    @Query(value = """
        SELECT
            i.inquiry_id AS inquiryId,
            i.inquiry_type AS type,
            i.title,
            r.detail_address AS roomInfo,
            DATE_FORMAT(i.created_at, '%Y-%m-%d') AS createdAt,
            i.status
        FROM inquiry i
            JOIN contract c ON i.contract_id = c.contract_id
            JOIN room r ON c.room_id = r.room_id
        WHERE c.landlord_id = :landlordId
        ORDER BY i.created_at DESC
        LIMIT 3
    """, nativeQuery = true)
    List<Map<String, Object>> findRecentInquiriesByLandlordId(@Param("landlordId") Long landlordId);


    // 임차인 대시보드 데이터 조회
    @Query(value = """
        SELECT
            CASE
                WHEN EXISTS (SELECT 1 FROM payment WHERE contract_id = c.contract_id AND payment_status = '확인중')
                THEN (SELECT DATE(due_date) FROM payment WHERE contract_id = c.contract_id AND payment_status = '확인중' ORDER BY due_date ASC LIMIT 1)
                ELSE DATE(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
            END AS dueDate,
            c.monthly_rent AS monthlyRent,
            (SELECT COUNT(*) FROM payment WHERE contract_id = c.contract_id AND payment_status = '미납') AS paymentOverdue
        FROM contract c
        WHERE c.tenant_id = :tenantId
        LIMIT 1
    """, nativeQuery = true)
    Map<String, Object> getTenantDashboardData(@Param("tenantId") Long tenantId);

    // 임차인을 위한 최근 공지사항 조회
    @Query(value = """
        SELECT
            n.notice_id AS notice_id,
            n.title,
            DATE_FORMAT(n.created_at, '%Y-%m-%d') AS created_at
        FROM notice n
            JOIN building b ON n.building_id = b.building_id
            JOIN room r ON r.property_id = b.building_id
            JOIN contract c ON c.room_id = r.room_id
        WHERE c.tenant_id = :tenantId
        ORDER BY n.created_at DESC
        LIMIT 3
    """, nativeQuery = true)
    List<Map<String, Object>> findRecentNoticesByTenantId(@Param("tenantId") Long tenantId);

}
