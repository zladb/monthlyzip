package com.monthlyzip.domain.room.model.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class RoomBatchRequestDto {

    @NotNull(message = "propertyId는 필수입니다.")
    private Long propertyId;

    @NotEmpty(message = "rooms는 비어 있을 수 없습니다.")
    @Valid
    private List<RoomRequestDto> rooms;
}
