package com.monthlyzip.domain.notice.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
<<<<<<< HEAD

@Getter
@Setter
=======
import lombok.ToString;

@Getter
@Setter
@ToString
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
public class NoticeUpdateRequestDto {

    @NotBlank(message = "제목은 필수입니다.")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;
}
