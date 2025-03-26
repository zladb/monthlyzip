package com.monthlyzip.domain.room.service;

import com.monthlyzip.domain.building.model.entity.Building;
import com.monthlyzip.domain.building.repository.BuildingRepository;
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.model.entity.Room;
import com.monthlyzip.domain.room.repository.RoomRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;

    @Transactional
    public List<RoomResponseDto> createRooms(RoomBatchRequestDto batchRequestDto) {
        Long propertyId = batchRequestDto.getPropertyId();
        List<RoomRequestDto> roomDtos = batchRequestDto.getRooms();

        Building building = buildingRepository.findById(propertyId)
                .orElseThrow(() -> new BusinessException(ApiResponseStatus.BUILDING_NOT_FOUND));

        List<Room> rooms = roomDtos.stream()
                .map(dto -> Room.builder()
                        .building(building)
                        .detailAddress(dto.getDetailAddress())
                        .area(dto.getArea())
                        .isOccupied(Boolean.TRUE.equals(dto.getIsOccupied())) // null → false
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

        if (dto.getDetailAddress() != null) room.setDetailAddress(dto.getDetailAddress());
        if (dto.getArea() != null) room.setArea(dto.getArea());
        if (dto.getIsOccupied() != null) room.setIsOccupied(dto.getIsOccupied());

        return RoomResponseDto.of(room);
    }

    @Transactional
    public void deleteRoom(Long roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new BusinessException(ApiResponseStatus.ROOM_NOT_FOUND);
        }
        roomRepository.deleteById(roomId);
    }
}
