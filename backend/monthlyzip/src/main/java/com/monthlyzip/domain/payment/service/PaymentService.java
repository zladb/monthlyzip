package com.monthlyzip.domain.payment.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.dto.response.DepositDeductionResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentCreateResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentResponseDto;
import com.monthlyzip.domain.payment.model.entity.Payment;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import com.monthlyzip.domain.payment.repository.PaymentRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ContractRepository contractRepository;

    public PaymentCreateResponseDto createPayment(Long memberId, PaymentCreateRequestDto dto) {
        // 1. 계약 존재 여부 확인
        Contract contract = contractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        // 2. 계약이 이 사용자(memberId)의 것인지 확인
        if (!contract.getLandlordId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);  // 또는 적절한 에러코드
        }

        // 3. 납부 정보 생성
        Payment payment = Payment.builder()
                .contract(contract)
                .paymentDate(dto.getPaymentDate())
                .dueDate(dto.getDueDate())
                .amount(dto.getAmount())
                .paymentStatus(dto.getPaymentStatus())
                .paymentProof(dto.getPaymentProof())
                .build();

        // 4. 저장
        Payment saved = paymentRepository.save(payment);

        // 5. ID 반환
        return new PaymentCreateResponseDto(saved.getId());
    }
    public List<PaymentResponseDto> getPayments(Long memberId) {
        List<Payment> payments = paymentRepository.findAll();

        // 임차인 id 일때 납부내역 조회
        return payments.stream()
                .filter(payment -> payment.getContract().getTenantId().equals(memberId))
                .map(PaymentResponseDto::from)
                .toList();
    }

    public PaymentResponseDto getPaymentById(Long memberId, Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.PAYMENT_NOT_FOUND));

        // 계약 주인(memberId)이 맞는지 검증
        if (!payment.getContract().getTenantId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);
        }

        return PaymentResponseDto.from(payment);
    }

    public Long getCurrentMonthIncome(Long landlordId) {
        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        Long income = paymentRepository.getTotalIncomeForCurrentMonth(landlordId, year, month);
        return income != null ? income : 0L;
    }

    @Transactional
    public DepositDeductionResponseDto createDepositDeduction(Long tenantId) {
        List<Contract> contracts = contractRepository.findByTenantId(tenantId);

        Payment targetPayment = contracts.stream()
                .flatMap(contract -> paymentRepository
                        .findTopByContractIdAndPaymentStatusOrderByDueDateDesc(contract.getId(), PaymentStatus.미납)
                        .stream())
                .findFirst()
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.NO_UNPAID_RENT));

        Contract contract = targetPayment.getContract();
        Long amount = targetPayment.getAmount();

        Long remaining = contract.getRemainingDeposit();
        if (remaining == null) remaining = contract.getDeposit(); // 백필 방지
        if (remaining < amount) {
            throw new BusinessException(ApiResponseStatus.DEPOSIT_TOO_LOW);
        }

        // ✅ 보증금 차감
        contract.setRemainingDeposit(remaining - amount);

        // 납부 상태 변경
        targetPayment.setPaymentStatus(PaymentStatus.보증금차감);
        LocalDateTime processedTime = LocalDateTime.now();
        targetPayment.setPaymentDate(processedTime);

        return DepositDeductionResponseDto.of(
                targetPayment,
                amount,
                contract.getRemainingDeposit()
        );
    }

    public Long getDepositBalance(Long memberId, Long contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (!contract.getTenantId().equals(memberId) && !contract.getLandlordId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);
        }

        Long totalDeducted = paymentRepository.findByContractId(contractId).stream()
                .filter(p -> p.getPaymentStatus() == PaymentStatus.보증금차감)
                .mapToLong(Payment::getAmount)
                .sum();

        return contract.getDeposit() - totalDeducted;
    }


}
