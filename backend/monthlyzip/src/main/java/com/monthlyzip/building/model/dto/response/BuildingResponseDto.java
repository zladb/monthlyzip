package com.monthlyzip.building.model.dto.response;
import com.monthlyzip.building.model.entity.Building;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@ToString
public class BuildingResponseDto {
    private Long id;
    private String address;
    private String buildingName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ✅ 정적 팩토리 메서드 추가
    public static BuildingResponseDto of(Building building) {
        return BuildingResponseDto.builder()
                .id(building.getId())
                .address(building.getAddress())
                .buildingName(building.getBuildingName())
                .createdAt(building.getCreatedAt())
                .updatedAt(building.getUpdatedAt())
                .build();
    }
}
