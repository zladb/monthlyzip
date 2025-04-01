package com.monthlyzip.domain.notice.controller;

import com.monthlyzip.domain.notice.model.dto.request.NoticeRequestDto;
import com.monthlyzip.domain.notice.model.dto.request.NoticeUpdateRequestDto;
import com.monthlyzip.domain.notice.model.dto.response.NoticeResponseDto;
import com.monthlyzip.domain.notice.service.NoticeService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    // ✅ 공지사항 등록
    @PostMapping
    public ApiResponse<NoticeResponseDto> createNotice(
            @RequestBody @Valid NoticeRequestDto requestDto
    ) {
        log.debug("공지사항 등록 요청");
        return ApiResponse.success(noticeService.createNotice(requestDto));
    }

    // ✅ 공지사항 목록 조회 (빌딩 ID 기준)
    @GetMapping
    public ApiResponse<List<NoticeResponseDto>> getNoticesByBuilding(
            @RequestParam("buildingId") Long buildingId
    ) {
        log.debug("공지사항 목록 조회 요청");
        return ApiResponse.success(noticeService.getNoticesByBuilding(buildingId));
    }

    // ✅ 공지사항 상세 조회
    @GetMapping("/{noticeId}")
    public ApiResponse<NoticeResponseDto> getNoticeById(
            @PathVariable Long noticeId
    ) {
        log.debug("공지사항 상세 조회 요청");
        return ApiResponse.success(noticeService.getNoticeById(noticeId));
    }

    // ✅ 공지사항 수정
    @PatchMapping("/{noticeId}")
    public ApiResponse<NoticeResponseDto> updateNotice(
            @PathVariable Long noticeId,
            @RequestBody @Valid NoticeUpdateRequestDto requestDto
    ) {
        log.debug("공지사항 수정 요청");
        return ApiResponse.success(noticeService.updateNotice(noticeId, requestDto));
    }

    // ✅ 공지사항 삭제
    @DeleteMapping("/{noticeId}")
    public ApiResponse<Void> deleteNotice(
            @PathVariable Long noticeId
    ) {
        log.debug("공지사항 삭제 요청");
        noticeService.deleteNotice(noticeId);
        return ApiResponse.success();
    }
}
