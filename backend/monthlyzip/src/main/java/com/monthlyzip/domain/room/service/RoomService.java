package com.monthlyzip.domain.room.service;

import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomDetailResponseDto;
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;

    @Transactional
    public List<RoomResponseDto> createRooms(Long memberId, RoomBatchRequestDto batchRequestDto) {
        Long propertyId = batchRequestDto.getPropertyId();
        List<com.monthlyzip.domain.room.model.dto.request.RoomRequestDto> roomDtos = batchRequestDto.getRooms();

        Building building = buildingRepository.findById(propertyId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        if (!building.getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        List<Room> rooms = roomDtos.stream()
                .map(dto -> Room.builder()
                        .building(building)
                        .detailAddress(dto.getDetailAddress())
                        .area(dto.getArea())
                        .isOccupied(Boolean.TRUE.equals(dto.getIsOccupied()))
                        .build())
                .collect(Collectors.toList());

        try {
            roomRepository.saveAll(rooms);
        } catch (DataIntegrityViolationException e) {
            throw new BusinessException(ApiResponseStatus.ROOM_DUPLICATE);
        }

        return rooms.stream()
                .map(RoomResponseDto::of)
                .collect(Collectors.toList());
    }

    public List<RoomDetailResponseDto> getRooms(Long memberId, Long propertyId, Boolean isOccupied) {
        Building building = buildingRepository.findById(propertyId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        if (!building.getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        List<Room> rooms = roomRepository.findByBuildingId(propertyId);

        if (isOccupied != null) {
            rooms = rooms.stream()
                    .filter(room -> isOccupied.equals(room.getIsOccupied()))
                    .collect(Collectors.toList());
        }

        return rooms.stream()
                .map(RoomDetailResponseDto::of)
                .collect(Collectors.toList());
    }

    public RoomDetailResponseDto getRoomById(Long memberId, Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        Long ownerId = room.getBuilding().getOwner().getId();
        boolean isOwner = ownerId.equals(memberId);
        boolean isValidTenant = getLatestValidContract(room).map(contract -> contract.getTenantId() != null && contract.getTenantId().equals(memberId)).orElse(false);

        if (!(isOwner || isValidTenant)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        return RoomDetailResponseDto.of(room);
    }

    private Optional<Contract> getLatestValidContract(Room room) {
        return room.getContracts().stream()
                .filter(c -> Boolean.TRUE.equals(c.getIsActiveTenant()) && Boolean.TRUE.equals(c.getIsActiveLandlord()))
                .filter(c -> {
                    LocalDateTime now = LocalDateTime.now();
                    return (c.getStartDate().isBefore(now) || c.getStartDate().isEqual(now)) &&
                            (c.getEndDate().isAfter(now) || c.getEndDate().isEqual(now));
                })
                .max(Comparator.comparing(Contract::getStartDate));
    }

    @Transactional
    public RoomDetailResponseDto updateRoom(Long memberId, Long roomId, RoomUpdateRequestDto dto) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        if (!room.getBuilding().getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        if (dto.getDetailAddress() != null) room.setDetailAddress(dto.getDetailAddress());
        if (dto.getArea() != null) room.setArea(dto.getArea());
        if (dto.getIsOccupied() != null) room.setIsOccupied(dto.getIsOccupied());

        return RoomDetailResponseDto.of(room);
    }

    @Transactional
    public void deleteRoom(Long memberId, Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        if (!room.getBuilding().getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

        roomRepository.deleteById(roomId);
    }
}
