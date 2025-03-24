package com.monthlyzip.building.model.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuildingUpdateRequestDto {
    private String address;
    private String buildingName;
}
