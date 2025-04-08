package com.monthlyzip.domain.transfer.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.payment.model.dto.request.PaymentCreateRequestDto;
import com.monthlyzip.domain.payment.model.enums.PaymentStatus;
import com.monthlyzip.domain.payment.service.PaymentService;
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
    @Value("${fintech.url.transfer-url}")
    private String TRANSFER_API_URL;

    private static final String INSTITUTION_CODE = "00100";
    private static final String FINTECH_APP_NO = "001";

    public void transfer(String withdrawalAccountNo, String depositAccountNo, String userKey, long amount, Contract contract, Long tenantId) {
        try {
            LocalDateTime now = LocalDateTime.now();
            String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
            String transactionUniqueNo = transmissionDate + transmissionTime + String.format("%06d", new Random().nextInt(999999));

            Map<String, Object> requestBody = new HashMap<>();
            Map<String, String> header = new HashMap<>();

            header.put("apiName", "updateDemandDepositAccountTransfer");
            header.put("transmissionDate", transmissionDate);
            header.put("transmissionTime", transmissionTime);
            header.put("institutionCode", INSTITUTION_CODE);
            header.put("fintechAppNo", FINTECH_APP_NO);
            header.put("apiServiceCode", "updateDemandDepositAccountTransfer");
            header.put("institutionTransactionUniqueNo", transactionUniqueNo);
            header.put("apiKey", MANAGER_API_KEY);
            header.put("userKey", userKey);

            requestBody.put("Header", header);
            requestBody.put("depositAccoutNo", depositAccountNo);
            requestBody.put("depositTransactionSummary", "(월세 납부) 입금");
            requestBody.put("transactionBalance", String.valueOf(amount));
            requestBody.put("withdrawalAccountNo", withdrawalAccountNo);
            requestBody.put("withdrawalTransactionSummary", "(월세 납부) 출금");

            ResponseEntity<String> response = restTemplate.postForEntity(
                    TRANSFER_API_URL,
                    requestBody,
                    String.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                log.error("송금 실패 - 응답 코드: {}", response.getStatusCode());
                throw new BusinessException(ApiResponseStatus.EXTERNAL_TRANSFER_API_ERROR);
            }

            log.info("송금 성공 - from: {}, to: {}, amount: {}", withdrawalAccountNo, depositAccountNo, amount);

//            ✅ 송금 성공 시 납부 내역 생성
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

        } catch (Exception e) {
            log.error("송금 중 예외 발생", e);
            throw new BusinessException(ApiResponseStatus.EXTERNAL_TRANSFER_API_ERROR);
        }
    }
}
