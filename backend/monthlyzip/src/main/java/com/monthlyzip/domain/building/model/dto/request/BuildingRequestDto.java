package com.monthlyzip.domain.building.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuildingRequestDto {

    @NotBlank(message = "주소는 필수입니다.")
    private String address;

    @NotBlank(message = "건물 이름은 필수입니다.")
    private String buildingName;
}
