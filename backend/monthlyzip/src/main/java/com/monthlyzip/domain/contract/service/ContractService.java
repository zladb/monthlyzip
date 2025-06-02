package com.monthlyzip.domain.contract.service;

import com.monthlyzip.domain.contract.model.dto.request.ContractRequestDto;
import com.monthlyzip.domain.contract.model.dto.request.ContractUpdateRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.ContractResponseDto;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ContractService {

    private final ContractRepository contractRepository;
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ContractResponseDto createContract(Long landlordId, ContractRequestDto dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        Contract contract = Contract.builder()
                .room(room)
                .landlordId(landlordId)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .monthlyRent(dto.getMonthlyRent())
                .deposit(dto.getDeposit())
                .paymentDay(dto.getPaymentDay())
                .bankAccount(dto.getBankAccount())
                .isActiveLandlord(true)
                .isActiveTenant(false)
                .build();

        contractRepository.save(contract);
        return toResponseDto(contract);
    }

    public List<ContractResponseDto> getContracts(Long memberId, boolean isActiveOnly) {
        List<Contract> contractsAsLandlord = contractRepository.findByLandlordId(memberId);
        List<Contract> contractsAsTenant = contractRepository.findByTenantId(memberId);

        Stream<Contract> allContracts = Stream.concat(contractsAsLandlord.stream(), contractsAsTenant.stream());

        if (isActiveOnly) {
            allContracts = allContracts.filter(contract -> {
                boolean isLandlordMatch = Objects.equals(contract.getLandlordId(), memberId) && Boolean.TRUE.equals(contract.getIsActiveLandlord());
                boolean isTenantMatch = Objects.equals(contract.getTenantId(), memberId) && Boolean.TRUE.equals(contract.getIsActiveTenant());

                // 둘 다 연결되어 있고, 내가 계약자이며, 내 상태도 active여야 함
                return (contract.getTenantId() != null) && (isLandlordMatch || isTenantMatch);
            });
        }

        return allContracts.map(this::toResponseDto).collect(Collectors.toList());
    }

    public ContractResponseDto getContract(Long contractId, Long memberId) {
        Contract contract = findContract(contractId);

        if (!Objects.equals(memberId, contract.getLandlordId()) &&
                !Objects.equals(memberId, contract.getTenantId())) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        return toResponseDto(contract);
    }

    @Transactional
    public ContractResponseDto updateContract(Long contractId, Long memberId, ContractUpdateRequestDto dto) {
        Contract contract = findContract(contractId);

        if (!Objects.equals(memberId, contract.getLandlordId())) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        if (dto.getStartDate() != null) contract.setStartDate(dto.getStartDate());
        if (dto.getEndDate() != null) contract.setEndDate(dto.getEndDate());
        if (dto.getMonthlyRent() != null) contract.setMonthlyRent(dto.getMonthlyRent());
        if (dto.getDeposit() != null) contract.setDeposit(dto.getDeposit());
        if (dto.getPaymentDay() != null) contract.setPaymentDay(dto.getPaymentDay());
        if (dto.getBankAccount() != null) contract.setBankAccount(dto.getBankAccount());

        return toResponseDto(contract);
    }

    @Transactional
    public void terminateContract(Long contractId, Long memberId) {
        Contract contract = findContract(contractId);

        if (Objects.equals(memberId, contract.getLandlordId())) {
            contract.setIsActiveLandlord(false);
        } else if (Objects.equals(memberId, contract.getTenantId())) {
            contract.setIsActiveTenant(false);
        } else {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }
    }

    @Transactional
    public ContractResponseDto acceptInvitation(Long contractId, Long tenantId) {
        Contract contract = findContract(contractId);

        if (Objects.equals(tenantId, contract.getLandlordId())) {
            throw new BusinessException(ApiResponseStatus.INVALID_ROLE);
        }

        if (contract.getTenantId() != null) {
            throw new BusinessException(ApiResponseStatus.CONTRACT_ALREADY_CONNECTED);
        }

        contract.setTenantId(tenantId);
        contract.setIsActiveTenant(true);

        return toResponseDto(contract);
    }

    private Contract findContract(Long contractId) {
        return contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));
    }

    private ContractResponseDto toResponseDto(Contract contract) {
        Member landlord = memberRepository.findById(contract.getLandlordId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        Member tenant = null;
        if (contract.getTenantId() != null) {
            tenant = memberRepository.findById(contract.getTenantId())
                    .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));
        }

        return ContractResponseDto.of(contract, landlord, tenant);
    }
}
