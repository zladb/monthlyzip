package com.monthlyzip.domain.contract.controller;

import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.contract.model.dto.request.ContractRequestDto;
import com.monthlyzip.domain.contract.model.dto.request.ContractUpdateRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.ContractResponseDto;
import com.monthlyzip.domain.contract.service.ContractService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    // ✅ 계약 생성
    @PostMapping
    public ApiResponse<ContractResponseDto> createContract(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid ContractRequestDto requestDto) {
        log.debug("임대 계약 생성 요청");
        Long landlordId = userDetails.getMember().getId();
        return ApiResponse.success(contractService.createContract(landlordId, requestDto));
    }

    // ✅ 계약 목록 조회 (임대인 or 임차인 기준)
    @GetMapping
    public ApiResponse<List<ContractResponseDto>> getContracts(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(value = "isActive", required = false, defaultValue = "false") boolean isActive
    ) {
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(contractService.getContracts(memberId, isActive));
    }

    // ✅ 계약 상세 조회
    @GetMapping("/{contractId}")
    public ApiResponse<ContractResponseDto> getContract(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long contractId) {
        log.debug("임대 계약 상세 조회 요청 - contractId: {}", contractId);
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(contractService.getContract(contractId, memberId));
    }

    // ✅ 계약 수정 (임대인만)
    @PatchMapping("/{contractId}")
    public ApiResponse<ContractResponseDto> updateContract(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long contractId,
            @RequestBody ContractUpdateRequestDto requestDto) {
        log.debug("임대 계약 수정 요청 - contractId: {}", contractId);
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(contractService.updateContract(contractId, memberId, requestDto));
    }

    // ✅ 계약 해지 (임대인 또는 임차인)
    @DeleteMapping("/{contractId}")
    public ApiResponse<Void> terminateContract(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long contractId) {
        log.debug("임대 계약 해지 요청 - contractId: {}", contractId);
        Long memberId = userDetails.getMember().getId();
        contractService.terminateContract(contractId, memberId);
        return ApiResponse.success();
    }
}