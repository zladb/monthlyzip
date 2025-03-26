package com.monthlyzip.domain.building.model.dto.response;

import com.monthlyzip.domain.building.model.entity.Building;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class BuildingDetailResponseDto {
    private Long id;
    private Long ownerId;
    private String ownerName;
    private String address;
    private String buildingName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ✅ 정적 팩토리 메서드 추가
    public static BuildingDetailResponseDto of(Building building) {
        return BuildingDetailResponseDto.builder()
                .id(building.getId())
                .ownerId(building.getOwner().getId())
                .ownerName(building.getOwner().getName())
                .address(building.getAddress())
                .buildingName(building.getBuildingName())
                .createdAt(building.getCreatedAt())
                .updatedAt(building.getUpdatedAt())
                .build();
    }
}