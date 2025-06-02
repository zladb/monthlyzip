package com.monthlyzip.domain.building.model.dto.request;

import jakarta.validation.constraints.NotBlank;
<<<<<<< HEAD
import jakarta.validation.constraints.NotNull;
=======
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuildingRequestDto {
<<<<<<< HEAD
    @NotNull(message = "ownerId는 필수입니다.")
    private Long ownerId;
=======
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

    @NotBlank(message = "주소는 필수입니다.")
    private String address;

    @NotBlank(message = "건물 이름은 필수입니다.")
    private String buildingName;
}
