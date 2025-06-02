package com.monthlyzip.domain.contract.controller;

<<<<<<< HEAD
=======
import com.monthlyzip.domain.auth.dto.CustomUserDetails;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import com.monthlyzip.domain.contract.model.dto.request.InviteVerifyRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.InviteCodeResponseDto;
import com.monthlyzip.domain.contract.service.ContractInviteService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
<<<<<<< HEAD
=======
import org.springframework.security.core.annotation.AuthenticationPrincipal;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractInviteController {

    private final ContractInviteService inviteService;

<<<<<<< HEAD
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
=======
    // ✅ 초대 코드 생성 (임대인만)
    @PostMapping("/{contractId}/invite")
    public ApiResponse<InviteCodeResponseDto> createInviteCode(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long contractId) {
        log.debug("초대 코드 생성 요청 - contractId: {}", contractId);
        Long landlordId = userDetails.getMember().getId();
        return ApiResponse.success(inviteService.createInviteCode(contractId, landlordId));
    }

    // ✅ 초대 코드 수락 (임차인만)
    @PostMapping("/invite/verify")
    public ApiResponse<Void> verifyInviteCode(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid InviteVerifyRequestDto requestDto) {
        Long tenantId = userDetails.getMember().getId();
        log.debug("초대 코드 수락 요청 - code: {}, tenantId(fromToken): {}", requestDto.getCode(), tenantId);
        inviteService.verifyInviteCode(requestDto.getCode(), tenantId);
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        return ApiResponse.success();
    }
}
