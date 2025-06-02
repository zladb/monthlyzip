package com.monthlyzip.domain.contract.service;

<<<<<<< HEAD
import com.monthlyzip.domain.contract.model.dto.request.InviteVerifyRequestDto;
=======
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import com.monthlyzip.domain.contract.model.dto.response.InviteCodeResponseDto;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ContractInviteService {

    private final ContractRepository contractRepository;
    private final StringRedisTemplate redisTemplate;

    private static final String INVITE_PREFIX = "contract:invite:";
    private static final Duration CODE_EXPIRATION = Duration.ofMinutes(10);

    // ✅ 초대 코드 생성
<<<<<<< HEAD
    public InviteCodeResponseDto createInviteCode(Long contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

=======
    public InviteCodeResponseDto createInviteCode(Long contractId, Long landlordId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (!contract.getLandlordId().equals(landlordId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        if (contract.getTenantId() != null) {
            throw new BusinessException(ApiResponseStatus.CONTRACT_ALREADY_CONNECTED);
        }

        String code = generateCode();
        redisTemplate.opsForValue().set(INVITE_PREFIX + code, String.valueOf(contractId), CODE_EXPIRATION);

        return InviteCodeResponseDto.builder().code(code).build();
    }

<<<<<<< HEAD
    // ✅ 초대 코드 검증 및 계약 연결
    @Transactional
    public void verifyInviteCode(InviteVerifyRequestDto requestDto) {
        String codeKey = INVITE_PREFIX + requestDto.getCode();
=======
    // ✅ 초대 코드 수락 (임차인)
    @Transactional
    public void verifyInviteCode(String code, Long tenantId) {
        String codeKey = INVITE_PREFIX + code;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        String contractIdStr = redisTemplate.opsForValue().get(codeKey);

        if (contractIdStr == null) {
            throw new BusinessException(ApiResponseStatus.INVITE_CODE_INVALID);
        }

        Long contractId = Long.parseLong(contractIdStr);
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (contract.getTenantId() != null) {
            throw new BusinessException(ApiResponseStatus.CONTRACT_ALREADY_CONNECTED);
        }

<<<<<<< HEAD
        contract.setTenantId(requestDto.getTenantId());
        contract.setIsActiveTenant(true);
        redisTemplate.delete(codeKey); // 사용 후 삭제
    }

    // 🔐 랜덤 초대 코드 생성
=======
        if (contract.getLandlordId().equals(tenantId)) {
            throw new BusinessException(ApiResponseStatus.INVALID_ROLE);
        }

        contract.setTenantId(tenantId);
        contract.setIsActiveTenant(true);
        redisTemplate.delete(codeKey);
    }

    // 🔐 랜덤 코드 생성기
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    private String generateCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
