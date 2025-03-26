package com.monthlyzip.domain.contract.service;

import com.monthlyzip.domain.contract.model.dto.request.ContractRequestDto;
import com.monthlyzip.domain.contract.model.dto.request.ContractUpdateRequestDto;
import com.monthlyzip.domain.contract.model.dto.response.ContractResponseDto;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractService {

    private final ContractRepository contractRepository;
    private final RoomRepository roomRepository;

    // 계약 생성
    @Transactional
    public ContractResponseDto createContract(ContractRequestDto dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        Contract contract = Contract.builder()
                .room(room)
                .landlordId(dto.getLandlordId())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .monthlyRent(dto.getMonthlyRent())
                .deposit(dto.getDeposit())
                .paymentDay(dto.getPaymentDay())
                .bankAccount(dto.getBankAccount())
                .isActiveLandlord(true)
                .isActiveTenant(false) // 임차인 미등록 상태
                .build();

        contractRepository.save(contract);
        return ContractResponseDto.of(contract);
    }

    // 계약 목록 조회 (임대인 기준)
    public List<ContractResponseDto> getContractsByLandlord(Long landlordId) {
        List<Contract> contracts = contractRepository.findByLandlordId(landlordId);
        return contracts.stream()
                .map(ContractResponseDto::of)
                .collect(Collectors.toList());
    }

    // 계약 상세 조회
    public ContractResponseDto getContract(Long contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));
        return ContractResponseDto.of(contract);
    }

    // 계약 수정
    @Transactional
    public ContractResponseDto updateContract(Long contractId, ContractUpdateRequestDto dto) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (dto.getStartDate() != null) contract.setStartDate(dto.getStartDate());
        if (dto.getEndDate() != null) contract.setEndDate(dto.getEndDate());
        if (dto.getMonthlyRent() != null) contract.setMonthlyRent(dto.getMonthlyRent());
        if (dto.getDeposit() != null) contract.setDeposit(dto.getDeposit());
        if (dto.getPaymentDay() != null) contract.setPaymentDay(dto.getPaymentDay());
        if (dto.getBankAccount() != null) contract.setBankAccount(dto.getBankAccount());

        return ContractResponseDto.of(contract);
    }

    // 계약 해지 (is_active_* 처리)
    @Transactional
    public void terminateContract(Long contractId, boolean isLandlord) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        if (isLandlord) {
            contract.setIsActiveLandlord(false);
        } else {
            contract.setIsActiveTenant(false);
        }
    }
}
