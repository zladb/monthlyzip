package com.monthlyzip.domain.room.service;

import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
<<<<<<< HEAD
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
=======
import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomDetailResponseDto;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import java.util.List;
=======
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;

    @Transactional
<<<<<<< HEAD
    public List<RoomResponseDto> createRooms(RoomBatchRequestDto batchRequestDto) {
        Long propertyId = batchRequestDto.getPropertyId();
        List<RoomRequestDto> roomDtos = batchRequestDto.getRooms();
=======
    public List<RoomResponseDto> createRooms(Long memberId, RoomBatchRequestDto batchRequestDto) {
        Long propertyId = batchRequestDto.getPropertyId();
        List<com.monthlyzip.domain.room.model.dto.request.RoomRequestDto> roomDtos = batchRequestDto.getRooms();
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

        Building building = buildingRepository.findById(propertyId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

<<<<<<< HEAD
=======
        if (!building.getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        List<Room> rooms = roomDtos.stream()
                .map(dto -> Room.builder()
                        .building(building)
                        .detailAddress(dto.getDetailAddress())
                        .area(dto.getArea())
<<<<<<< HEAD
                        .isOccupied(Boolean.TRUE.equals(dto.getIsOccupied())) // null → false
=======
                        .isOccupied(Boolean.TRUE.equals(dto.getIsOccupied()))
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
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

<<<<<<< HEAD
    public List<RoomResponseDto> getRooms(Long propertyId) {
        List<Room> rooms = roomRepository.findByBuildingId(propertyId);
        return rooms.stream()
                .map(RoomResponseDto::of)
                .collect(Collectors.toList());
    }

    public RoomResponseDto getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));
        return RoomResponseDto.of(room);
    }

    @Transactional
    public RoomResponseDto updateRoom(Long roomId, RoomUpdateRequestDto dto) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

=======
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

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        if (dto.getDetailAddress() != null) room.setDetailAddress(dto.getDetailAddress());
        if (dto.getArea() != null) room.setArea(dto.getArea());
        if (dto.getIsOccupied() != null) room.setIsOccupied(dto.getIsOccupied());

<<<<<<< HEAD
        return RoomResponseDto.of(room);
    }

    @Transactional
    public void deleteRoom(Long roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND);
        }
=======
        return RoomDetailResponseDto.of(room);
    }

    @Transactional
    public void deleteRoom(Long memberId, Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND));

        if (!room.getBuilding().getOwner().getId().equals(memberId)) {
            throw new BusinessException(ApiResponseStatus.UNAUTHORIZED);
        }

>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
        roomRepository.deleteById(roomId);
    }
}
