package com.monthlyzip.domain.inquiry.repository;

import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    // 임차인이 작성한 문의 조회
    List<Inquiry> findByMemberId(Long memberId);

    // 임차인이 작성하고 특정 상태인 문의 조회
    List<Inquiry> findByMemberIdAndStatus(Long memberId, String status);

// --------------------------------------------------------------------------------

    // 임대인의 계약에 대한 문의 조회
    List<Inquiry> findByContractLandlordId(Long landlordId);

    // 임대인의 계약에 대한 특정 상태 문의 조회
    List<Inquiry> findByContractLandlordIdAndStatus(Long landlordId, String status);
}
