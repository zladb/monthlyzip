package com.monthlyzip.domain.room.model.dto.response;

import com.monthlyzip.domain.room.model.entity.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class RoomResponseDto {
    private Long roomId;
    private Long propertyId;
    private String detailAddress;
    private Long area;
    private Boolean isOccupied;

    public static RoomResponseDto of(Room room) {
        return RoomResponseDto.builder()
                .roomId(room.getId())
                .propertyId(room.getBuilding().getId())
                .detailAddress(room.getDetailAddress())
                .area(room.getArea())
                .isOccupied(room.getIsOccupied())
                .build();
    }
}
