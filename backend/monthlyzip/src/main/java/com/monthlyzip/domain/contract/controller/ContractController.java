package com.monthlyzip.domain.contract.controller;

import com.monthlyzip.domain.contract.model.dto.request.ContractRequestDto;
import com.monthlyzip.domain.contract.model.dto.request.ContractUpdateRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.ContractResponseDto;
import com.monthlyzip.domain.contract.service.ContractService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ApiResponse<ContractResponseDto> createContract(@RequestBody @Valid ContractRequestDto requestDto) {
        log.debug("임대 계약 생성 요청");
        return ApiResponse.success(contractService.createContract(requestDto));
    }

    // ✅ 계약 목록 조회 (임대인 기준)
    @GetMapping
    public ApiResponse<List<ContractResponseDto>> getContractsByLandlord(@RequestParam("landlordId") Long landlordId) {
        log.debug("임대 계약 목록 조회 요청 - landlordId: {}", landlordId);
        return ApiResponse.success(contractService.getContractsByLandlord(landlordId));
    }

    // ✅ 계약 상세 조회
    @GetMapping("/{contractId}")
    public ApiResponse<ContractResponseDto> getContract(@PathVariable Long contractId) {
        log.debug("임대 계약 상세 조회 요청 - contractId: {}", contractId);
        return ApiResponse.success(contractService.getContract(contractId));
    }

    // ✅ 계약 수정
    @PatchMapping("/{contractId}")
    public ApiResponse<ContractResponseDto> updateContract(
            @PathVariable Long contractId,
            @RequestBody ContractUpdateRequestDto requestDto
    ) {
        log.debug("임대 계약 수정 요청 - contractId: {}", contractId);
        return ApiResponse.success(contractService.updateContract(contractId, requestDto));
    }

    // ✅ 계약 해지 (임대인 또는 임차인)
    @DeleteMapping("/{contractId}")
    public ApiResponse<Void> terminateContract(
            @PathVariable Long contractId,
            @RequestParam("by") String by // landlord or tenant
    ) {
        log.debug("임대 계약 해지 요청 - contractId: {}, by: {}", contractId, by);
        boolean isLandlord = "landlord".equalsIgnoreCase(by);
        contractService.terminateContract(contractId, isLandlord);
        return ApiResponse.success();
    }
}
