package com.monthlyzip.domain.contract.controller;

import com.monthlyzip.domain.contract.model.dto.request.InviteVerifyRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.InviteCodeResponseDto;
import com.monthlyzip.domain.contract.service.ContractInviteService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractInviteController {

    private final ContractInviteService inviteService;

    // ✅ 초대 코드 생성 (임대인)
    @PostMapping("/{contractId}/invite")
    public ApiResponse<InviteCodeResponseDto> createInviteCode(@PathVariable Long contractId) {
        log.debug("초대 코드 생성 요청 - contractId: {}", contractId);
        return ApiResponse.success(inviteService.createInviteCode(contractId));
    }

    // ✅ 초대 코드 수락 (임차인)
    @PostMapping("/invite/verify")
    public ApiResponse<Void> verifyInviteCode(@RequestBody @Valid InviteVerifyRequestDto requestDto) {
        log.debug("초대 코드 수락 요청 - code: {}, tenantId: {}", requestDto.getCode(), requestDto.getTenantId());
        inviteService.verifyInviteCode(requestDto);
        return ApiResponse.success();
    }
}
