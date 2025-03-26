package com.monthlyzip.domain.building.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuildingRequestDto {
    @NotNull(message = "ownerId는 필수입니다.")
    private Long ownerId;

    @NotBlank(message = "주소는 필수입니다.")
    private String address;

    @NotBlank(message = "건물 이름은 필수입니다.")
    private String buildingName;
}
