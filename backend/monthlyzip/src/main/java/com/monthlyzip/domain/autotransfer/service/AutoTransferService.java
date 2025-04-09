package com.monthlyzip.domain.autotransfer.service;

import com.monthlyzip.domain.autotransfer.dto.request.AutoTransferCreateRequest;
import com.monthlyzip.domain.autotransfer.dto.response.AutoTransferCreateResponse;
import com.monthlyzip.domain.autotransfer.dto.response.AutoTransferInitResponse;
import com.monthlyzip.domain.autotransfer.entity.AutoTransfer;
import com.monthlyzip.domain.autotransfer.repository.AutoTransferRepository;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class AutoTransferService {

    private final AutoTransferRepository autoTransferRepository;
    private final ContractRepository contractRepository;
    private final MemberRepository memberRepository;

    // 자동이체 초기 등록 위한 정보 반환
    public AutoTransferInitResponse initAutoTransfer(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 해당 member가 tenant인 계약 정보 찾기
        Contract contract = contractRepository.findLatestByTenantId(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        String fromAccount = member.getAccountNo();        // 임차인 계좌
        String toAccount = contract.getBankAccount();      // 임대인 계좌

        return new AutoTransferInitResponse(
                contract.getId(),
                fromAccount,
                toAccount
        );
    }

    // 자동이체 생성
    public AutoTransferCreateResponse createAutoTransfer(Long memberId, AutoTransferCreateRequest request) {

        // 1. 날짜 유효성 체크
        if (request.getStartMonth().isAfter(request.getEndMonth())) {
            throw new BusinessException(ApiResponseStatus.INVALID_DATE_RANGE);
        }

        // 2. 계약 조회 및 임차인 확인
        Contract contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (!contract.getTenantId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN); // 자신 소유의 계약이 아님
        }

        // 3. 회원 정보 조회 (임차인 본인)
        Member tenant = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 4. 임대인 계좌 정보
        Member landlord = memberRepository.findById(contract.getLandlordId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        System.out.println();
        // 5. 자동이체 생성
        AutoTransfer autoTransfer = AutoTransfer.builder()
                .contract(contract)
                .tenant(tenant)
                .fromAccount(tenant)
                .toAccount(landlord)
                .amount(request.getAmount())
                .paymentDay((short) request.getPaymentDay())
                .startMonth(request.getStartMonth())
                .endMonth(request.getEndMonth())
                .build();

        AutoTransfer saved = autoTransferRepository.save(autoTransfer);
        return new AutoTransferCreateResponse(saved.getId());
    }

    public void deleteAutoTransfer(Long memberId) {
        // 해당 임차인이 등록한 자동이체가 있는지 확인
        AutoTransfer autoTransfer = autoTransferRepository.findByTenant_Id(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.AUTO_TRANSFER_NOT_FOUND));

        autoTransferRepository.delete(autoTransfer);
    }
}