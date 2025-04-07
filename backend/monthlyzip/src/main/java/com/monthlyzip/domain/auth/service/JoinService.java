package com.monthlyzip.domain.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monthlyzip.domain.auth.dto.request.CreateAccountRequest;
import com.monthlyzip.domain.auth.dto.request.JoinDto;
import com.monthlyzip.domain.auth.dto.request.UserKeyRequest;
import com.monthlyzip.domain.auth.dto.response.CreateAccountResponse;
import com.monthlyzip.domain.auth.dto.response.UserKeyResponse;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.enums.MemberType;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor  // 생성자 주입 받기
public class JoinService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RestTemplate restTemplate;

    @Value("${fintech.url.user-key}")
    private String USER_KEY_API_URL;
    @Value("${fintech.url.account-create}")
    private String ACCOUNT_API_URL;
    @Value("${fintech.values.manager-key}")
    private String MANAGER_API_KEY;
    @Value("${fintech.values.account-type-no}")
    private String ACCOUNT_NO_FIXED;
    private static final String INSTITUTION_CODE = "00100";
    private static final String FINTECH_APP_NO = "001";

    public void joinProcess(JoinDto joinDto) {

        String email = joinDto.getEmail();
        String password = joinDto.getPassword();
        String confirmPassword = joinDto.getConfirmPassword();
        String name = joinDto.getName();
        String phoneNumber = joinDto.getPhoneNumber();
        MemberType memberType = joinDto.getMemberType(); // Enum 사용

        // ******* ******* ******* 유효성 검사
        // 이메일 중복 검사
        if (memberRepository.existsByEmail(email)) {
            throw new BusinessException(ApiResponseStatus.EMAIL_DUPLICATE);
        }

        // 비밀번호 일치 여부 확인
        if (!password.equals(confirmPassword)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_MISMATCH);
        }

        String passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
        if (!password.matches(passwordPattern)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_INVALID);
        }
        // ******* ******* *******
        // ******* 금융 api 호출 *******
        // ******* ******* *******

        // ******* USER KEY 발급 부분 *******
        ObjectMapper objectMapper = new ObjectMapper();
        String userKey;
        try {
            UserKeyRequest keyRequest = new UserKeyRequest();
            keyRequest.setApiKey(MANAGER_API_KEY);
            keyRequest.setUserId(email);

            ResponseEntity<UserKeyResponse> keyResponse = restTemplate.postForEntity(
                    USER_KEY_API_URL,
                    keyRequest,
                    UserKeyResponse.class
            );

            if (!keyResponse.getStatusCode().is2xxSuccessful() || keyResponse.getBody() == null) {
                String responseBody = objectMapper.writeValueAsString(keyResponse.getBody());
                log.error("USER KEY API 응답 오류: status={}, body={}", keyResponse.getStatusCode(), responseBody);
                log.error("회원가입 실패 - USER API 응답 오류: {}", keyResponse.getStatusCode());
                throw new BusinessException(ApiResponseStatus.EXTERNAL_USERKEY_API_ERROR); // 적절한 에러 코드 사용
            }

            userKey = keyResponse.getBody().getUserKey();
        } catch (Exception e) {
            log.error("회원가입 실패 - USER KEY API 호출 중 예외 발생", e);
            throw new BusinessException(ApiResponseStatus.EXTERNAL_USERKEY_API_ERROR);
        }

        // ******* ACCOUNT NO 발급 부분 *******
        String accountNo;
        try {
            LocalDateTime now = LocalDateTime.now();
            String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
            String transactionUniqueNo = transmissionDate + transmissionTime + String.format("%06d", new Random().nextInt(999999));

            CreateAccountRequest.Header header = new CreateAccountRequest.Header();
            header.setApiName("createDemandDepositAccount");
            header.setTransmissionDate(transmissionDate);
            header.setTransmissionTime(transmissionTime);
            header.setInstitutionCode(INSTITUTION_CODE);
            header.setFintechAppNo(FINTECH_APP_NO);
            header.setApiServiceCode("createDemandDepositAccount");
            header.setInstitutionTransactionUniqueNo(transactionUniqueNo);
            header.setApiKey(MANAGER_API_KEY);
            header.setUserKey(userKey);

            CreateAccountRequest accountRequest = new CreateAccountRequest();
            accountRequest.setHeader(header);
            accountRequest.setAccountTypeUniqueNo(ACCOUNT_NO_FIXED);

            ObjectMapper objectMap = new ObjectMapper();
            String jsonBody = objectMap.writeValueAsString(accountRequest);
            log.info("보낼 JSON Body:\n{}", jsonBody);

            ResponseEntity<CreateAccountResponse> accountResponse = restTemplate.postForEntity(
                    ACCOUNT_API_URL,
                    accountRequest,
                    CreateAccountResponse.class
            );

            if (!accountResponse.getStatusCode().is2xxSuccessful() || accountResponse.getBody() == null) {
                log.error("회원가입 실패 - 계좌 생성 API 응답 오류: {}", accountResponse.getStatusCode());
                throw new BusinessException(ApiResponseStatus.EXTERNAL_ACCOUNT_API_ERROR);
            }
            accountNo = accountResponse.getBody().getRec().getAccountNo();
        } catch (Exception e) {
            log.error("회원가입 실패 - 계좌 생성 API 호출 중 예외 발생", e);
            throw new BusinessException(ApiResponseStatus.EXTERNAL_ACCOUNT_API_ERROR);
        }

        // 데이터 저장 부분
        Member data = new Member();
        data.setEmail(email);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setName(name);
        data.setPhoneNumber(phoneNumber);
        data.setMemberType(memberType); // Enum 저장
        data.setUserApiKey(userKey);
        data.setAccountNo(accountNo);

        System.out.println("JoinService : " + "회원가입 성공 : email = " + email + ", name = " + name);

        memberRepository.save(data);
    }
}
