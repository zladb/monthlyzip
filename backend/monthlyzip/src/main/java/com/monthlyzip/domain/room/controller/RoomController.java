package com.monthlyzip.domain.room.controller;

import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomDetailResponseDto;
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.service.RoomService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // ✅ 세대 생성
    @PostMapping
    public ApiResponse<List<RoomResponseDto>> createRooms(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody @Valid RoomBatchRequestDto batchRequestDto) {
        log.debug("세대 일괄 생성 요청 - 건물 ID: {}, 세대 수: {}", batchRequestDto.getPropertyId(), batchRequestDto.getRooms().size());
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.createRooms(memberId, batchRequestDto));
    }

    // ✅ 세대 목록 조회 (건물 기준, isOccupied 필터 가능)
    @GetMapping
    public ApiResponse<List<RoomDetailResponseDto>> getRooms(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam("propertyId") Long propertyId,
            @RequestParam(value = "isOccupied", required = false) Boolean isOccupied) {
        log.debug("세대 목록 조회 요청");
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.getRooms(memberId, propertyId, isOccupied));
    }

    // ✅ 세대 상세 조회
    @GetMapping("/{roomId}")
    public ApiResponse<RoomDetailResponseDto> getRoomById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId) {
        log.debug("세대 상세 조회 요청");
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.getRoomById(memberId, roomId));
    }

    // ✅ 세대 수정
    @PatchMapping("/{roomId}")
    public ApiResponse<RoomDetailResponseDto> updateRoom(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId,
            @RequestBody RoomUpdateRequestDto requestDto) {
        log.debug("세대 수정 요청");
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.updateRoom(memberId, roomId, requestDto));
    }

    // ✅ 세대 삭제
    @DeleteMapping("/{roomId}")
    public ApiResponse<Void> deleteRoom(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId) {
        log.debug("세대 삭제 요청");
        Long memberId = userDetails.getMember().getId();
        roomService.deleteRoom(memberId, roomId);
        return ApiResponse.success();
    }
}