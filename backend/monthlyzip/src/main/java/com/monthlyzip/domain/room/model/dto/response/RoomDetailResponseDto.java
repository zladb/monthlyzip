package com.monthlyzip.domain.room.model.dto.response;

import com.monthlyzip.domain.room.model.entity.Room;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class RoomDetailResponseDto {
    private Long id;
    private Long buildingId;
    private String buildingName;
    private String detailAddress;
    private Long area;
    private Boolean isOccupied;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RoomDetailResponseDto of(Room room) {
        return RoomDetailResponseDto.builder()
                .id(room.getId())
                .buildingId(room.getBuilding().getId())
                .buildingName(room.getBuilding().getBuildingName())
                .detailAddress(room.getDetailAddress())
                .area(room.getArea())
                .isOccupied(room.getIsOccupied())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .build();
    }
}
