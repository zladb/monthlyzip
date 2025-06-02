package com.monthlyzip.domain.notice.model.dto.response;

import com.monthlyzip.domain.notice.model.entity.Notice;
import lombok.Builder;
import lombok.Getter;
<<<<<<< HEAD
=======
import lombok.ToString;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c

import java.time.LocalDateTime;

@Getter
@Builder
<<<<<<< HEAD
=======
@ToString
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
public class NoticeResponseDto {

    private Long noticeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static NoticeResponseDto of(Notice notice) {
        return NoticeResponseDto.builder()
                .noticeId(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .createdAt(notice.getCreatedAt())
                .updatedAt(notice.getUpdatedAt())
                .build();
    }
}
