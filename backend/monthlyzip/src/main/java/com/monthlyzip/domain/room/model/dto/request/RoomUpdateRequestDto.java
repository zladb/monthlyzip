package com.monthlyzip.domain.room.model.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RoomUpdateRequestDto {
    private String detailAddress;
    private Long area;
    private Boolean isOccupied;
}
