package com.monthlyzip.domain.tenant.service;

import com.monthlyzip.domain.building.repository.BuildingRepository;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.domain.payment.model.entity.Payment;
import com.monthlyzip.domain.payment.repository.PaymentRepository;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.domain.tenant.model.dto.response.TenantDetailResponseDto;
import com.monthlyzip.domain.tenant.model.dto.response.TenantSummaryResponseDto;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantService {

    private final RoomRepository roomRepository;
    private final ContractRepository contractRepository;
    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final BuildingRepository buildingRepository;

    public List<TenantSummaryResponseDto> getTenantsByBuilding(Long buildingId, Long landlordId) {
        log.debug("📌 [임차인 목록 조회] buildingId: {}, landlordId: {}", buildingId, landlordId);

        // 🔒 권한 체크
        boolean isOwner = buildingRepository.existsByIdAndOwnerId(buildingId, landlordId);
        if (!isOwner) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        List<Contract> contracts = contractRepository.findByRoom_Building_IdAndTenantIdIsNotNull(buildingId);
        log.debug("📌 계약 건수: {}", contracts.size());

        return contracts.stream()
                .map(contract -> {
                    Room room = contract.getRoom();
                    if (room == null) {
                        log.error("❗ room is null for contractId: {}", contract.getId());
                        return null;
                    }

                    Member tenant = null;
                    if (contract.getTenantId() != null) {
                        tenant = memberRepository.findById(contract.getTenantId()).orElse(null);
                        if (tenant == null) {
                            log.warn("⚠️ 임차인 정보를 찾을 수 없습니다. tenantId: {}", contract.getTenantId());
                        }
                    }

                    log.debug("✅ 계약 ID: {}, 방: {}, 임차인: {}, 월세: {}",
                            contract.getId(),
                            room.getDetailAddress(),
                            tenant != null ? tenant.getName() : "null",
                            contract.getMonthlyRent());

                    return TenantSummaryResponseDto.builder()
                            .roomId(room.getId())
                            .roomNumber(room.getDetailAddress())
                            .tenantName(tenant != null ? tenant.getName() : null)
                            .monthlyRent(contract.getMonthlyRent())
                            .contractStart(contract.getStartDate())
                            .contractEnd(contract.getEndDate())
                            .build();
                })
                .filter(dto -> dto != null)
                .toList();
    }

    public TenantDetailResponseDto getTenantDetailByRoomId(Long roomId, Long landlordId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> {
                    log.error("❗ Room not found for roomId: {}", roomId);
                    return new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND);
                });

        // 🔒 권한 체크
        if (!room.getBuilding().getOwner().getId().equals(landlordId)) {
            log.warn("❌ 권한 없음: landlordId {}는 roomId {}에 접근할 수 없습니다.", landlordId, roomId);
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        Contract contract = contractRepository.findLatestByTenantIdIsNotNullAndRoomId(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        Member tenant = memberRepository.findById(contract.getTenantId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        List<Payment> payments = paymentRepository.findByContractId(contract.getId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return TenantDetailResponseDto.builder()
                .roomNumber(room.getDetailAddress())
                .tenant(TenantDetailResponseDto.TenantInfo.builder()
                        .name(tenant.getName())
                        .phoneNumber(tenant.getPhoneNumber())
                        .bankAccount(contract.getBankAccount())
                        .build())
                .contract(TenantDetailResponseDto.ContractInfo.builder()
                        .deposit(contract.getDeposit())
                        .monthlyRent(contract.getMonthlyRent())
                        .contractStart(contract.getStartDate().format(formatter))
                        .contractEnd(contract.getEndDate().format(formatter))
                        .build())
                .paymentHistory(payments.stream().map(payment ->
                        TenantDetailResponseDto.PaymentInfo.builder()
                                .date(payment.getDueDate().format(formatter))
                                .amount(payment.getAmount())
                                .status(payment.getPaymentStatus().name())
                                .build()
                ).toList())
                .build();
    }
}
