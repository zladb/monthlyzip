package com.monthlyzip.domain.room.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RoomRequestDto {

    @NotBlank(message = "상세 주소는 필수입니다.")
    private String detailAddress;

    private Long area;

    // 요청에서 생략 가능. null이면 서비스단에서 false 처리
    private Boolean isOccupied;
}

