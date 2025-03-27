package com.monthlyzip.domain.payment.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentCreateResponseDto;
import com.monthlyzip.domain.payment.model.dto.response.PaymentResponseDto;
import com.monthlyzip.domain.payment.model.entity.PaymentEntity;
import com.monthlyzip.domain.payment.repository.PaymentRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
        PaymentEntity payment = PaymentEntity.builder()
                .contract(contract)
                .paymentDate(dto.getPaymentDate())
                .dueDate(dto.getDueDate())
                .amount(dto.getAmount())
                .paymentStatus(dto.getPaymentStatus())
                .paymentProof(dto.getPaymentProof())
                .build();

        // 4. 저장
        PaymentEntity saved = paymentRepository.save(payment);

        // 5. ID 반환
        return new PaymentCreateResponseDto(saved.getId());
    }
    public List<PaymentResponseDto> getPayments(Long memberId) {
        List<PaymentEntity> payments = paymentRepository.findAll();

        // 임차인 id 일때 납부내역 조회
        return payments.stream()
                .filter(payment -> payment.getContract().getTenantId().equals(memberId))
                .map(PaymentResponseDto::from)
                .toList();
    }

    public PaymentResponseDto getPaymentById(Long memberId, Long paymentId) {
        PaymentEntity payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.PAYMENT_NOT_FOUND));

        // 계약 주인(memberId)이 맞는지 검증
        if (!payment.getContract().getTenantId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);
        }

        return PaymentResponseDto.from(payment);
    }
}
