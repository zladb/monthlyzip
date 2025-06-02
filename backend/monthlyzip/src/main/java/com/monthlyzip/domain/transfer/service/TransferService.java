package com.monthlyzip.domain.transfer.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import com.monthlyzip.domain.payment.service.PaymentService;
import com.monthlyzip.domain.transfer.dto.request.TransferRequest;
import com.monthlyzip.domain.transfer.dto.response.TransferInitResponse;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransferService {

    private final RestTemplate restTemplate;
    private final PaymentService paymentService;

    @Value("${fintech.values.manager-key}")
    private String MANAGER_API_KEY;
    @Value("${fintech.url.deposit-url}")
    private String ACCOUNT_DEPOSIT_URL;
    @Value("${fintech.url.withdraw-url}")
    private String ACCOUNT_WITHDRAW_URL;

    private static final String INSTITUTION_CODE = "00100";
    private static final String FINTECH_APP_NO = "001";
    private final ContractRepository contractRepository;
    private final MemberRepository memberRepository;

    public TransferInitResponse getTransferInitInfo(Long memberId) {
        // 계약 정보 조회 (임차인 기준으로 활성 계약)
        Contract contract = contractRepository.findByTenantIdAndIsActiveTenantTrue(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        // 임대인 정보 조회
        Member landlord = memberRepository.findById(contract.getLandlordId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 임차인 정보 조회
        Member tenant = memberRepository.findById(contract.getTenantId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        return new TransferInitResponse(
                landlord.getAccountNo(),     // landlordAccount
                landlord.getName(),          // landlordName
                tenant.getAccountNo(),       // tenantAccount
                tenant.getName()             // tenantName
        );
    }

    public void processTransfer(TransferRequest request, Long memberId) {
        Contract contract = contractRepository.findByTenantIdAndIsActiveTenantTrue(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        Member tenant = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 실제 송금 처리
        transfer(
                request.getTenantAccount(),    // withdrawal
                request.getLandlordAccount(),  // deposit
                tenant.getUserApiKey(),
                request.getAmount(),
                contract,
                memberId
        );
    }

    public void transfer(String withdrawalAccountNo, String depositAccountNo, String userKey, long amount, Contract contract, Long tenantId) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
        String transactionUniqueNo = transmissionDate + transmissionTime + String.format("%06d", new Random().nextInt(999999));

        // ====== 1️⃣ 출금 ======
        try {
            Map<String, Object> withdrawRequest = new HashMap<>();
            Map<String, String> withdrawHeader = new HashMap<>();

            withdrawHeader.put("apiName", "updateDemandDepositAccountWithdrawal");
            withdrawHeader.put("transmissionDate", transmissionDate);
            withdrawHeader.put("transmissionTime", transmissionTime);
            withdrawHeader.put("institutionCode", INSTITUTION_CODE);
            withdrawHeader.put("fintechAppNo", FINTECH_APP_NO);
            withdrawHeader.put("apiServiceCode", "updateDemandDepositAccountWithdrawal");
            withdrawHeader.put("institutionTransactionUniqueNo", transactionUniqueNo);
            withdrawHeader.put("apiKey", MANAGER_API_KEY);
            withdrawHeader.put("userKey", userKey);

            withdrawRequest.put("Header", withdrawHeader);
            withdrawRequest.put("accountNo", withdrawalAccountNo);
            withdrawRequest.put("transactionBalance", String.valueOf(amount));
            withdrawRequest.put("transactionSummary", "(월세 납부) 출금");

            ResponseEntity<String> withdrawResponse = restTemplate.postForEntity(
                    ACCOUNT_WITHDRAW_URL,
                    withdrawRequest,
                    String.class
            );

            if (!withdrawResponse.getStatusCode().is2xxSuccessful()) {
                log.error("출금 실패 - 응답 코드: {}", withdrawResponse.getStatusCode());
                throw new BusinessException(ApiResponseStatus.EXTERNAL_WITHDRAW_API_ERROR);
            }

            log.info("출금 성공 - 계좌: {}, 금액: {}", withdrawalAccountNo, amount);
        } catch (Exception e) {
            log.error("출금 중 예외 발생", e);
            throw new BusinessException(ApiResponseStatus.EXTERNAL_WITHDRAW_API_ERROR);
        }

        // ====== 2️⃣ 입금 ======
        try {
            Map<String, Object> depositRequest = new HashMap<>();
            Map<String, String> depositHeader = new HashMap<>();

            depositHeader.put("apiName", "updateDemandDepositAccountDeposit");
            depositHeader.put("transmissionDate", transmissionDate);
            depositHeader.put("transmissionTime", transmissionTime);
            depositHeader.put("institutionCode", INSTITUTION_CODE);
            depositHeader.put("fintechAppNo", FINTECH_APP_NO);
            depositHeader.put("apiServiceCode", "updateDemandDepositAccountDeposit");
            depositHeader.put("institutionTransactionUniqueNo", transactionUniqueNo);
            depositHeader.put("apiKey", MANAGER_API_KEY);
            depositHeader.put("userKey", userKey);

            depositRequest.put("Header", depositHeader);
            depositRequest.put("accountNo", depositAccountNo);
            depositRequest.put("transactionBalance", String.valueOf(amount));
            depositRequest.put("transactionSummary", "(월세 납부) 입금");

            ResponseEntity<String> depositResponse = restTemplate.postForEntity(
                    ACCOUNT_DEPOSIT_URL,
                    depositRequest,
                    String.class
            );

            if (!depositResponse.getStatusCode().is2xxSuccessful()) {
                log.error("입금 실패 - 응답 코드: {}", depositResponse.getStatusCode());
                throw new BusinessException(ApiResponseStatus.EXTERNAL_DEPOSIT_API_ERROR);
            }

            log.info("입금 성공 - 계좌: {}, 금액: {}", depositAccountNo, amount);
        } catch (Exception e) {
            log.error("입금 중 예외 발생", e);
            throw new BusinessException(ApiResponseStatus.EXTERNAL_DEPOSIT_API_ERROR);
        }

        // ✅ 둘 다 성공한 경우에만 납부 내역 등록
        PaymentCreateRequestDto paymentDto = new PaymentCreateRequestDto();
        paymentDto.setContractId(contract.getId());
        paymentDto.setPaymentDate(LocalDateTime.now());

        int paymentDay = contract.getPaymentDay();
        LocalDate dueDate = LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth(), paymentDay);
        paymentDto.setDueDate(dueDate.atStartOfDay());

        paymentDto.setAmount(amount);
        paymentDto.setPaymentStatus(PaymentStatus.납부완료);
        paymentDto.setPaymentProof(true);

        paymentService.createPayment(tenantId, paymentDto);
    }
}
