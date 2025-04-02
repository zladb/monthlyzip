package com.monthlyzip.domain.room.controller;

import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.service.RoomService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ApiResponse<List<RoomResponseDto>> createRooms(@RequestBody @Valid RoomBatchRequestDto batchRequestDto) {
        log.debug("세대 일괄 생성 요청 - 건물 ID: {}, 세대 수: {}", batchRequestDto.getPropertyId(), batchRequestDto.getRooms().size());
        return ApiResponse.success(roomService.createRooms(batchRequestDto));
    }



    // ✅ 세대 목록 조회 (건물 기준)
    @GetMapping
    public ApiResponse<List<RoomResponseDto>> getRooms(@RequestParam("propertyId") Long propertyId) {
        log.debug("세대 목록 조회 요청");
        return ApiResponse.success(roomService.getRooms(propertyId));
    }

    // ✅ 세대 상세 조회
    @GetMapping("/{roomId}")
    public ApiResponse<RoomResponseDto> getRoomById(@PathVariable("roomId") Long roomId) {
        log.debug("세대 상세 조회 요청");
        return ApiResponse.success(roomService.getRoomById(roomId));
    }

    // ✅ 세대 수정
    @PatchMapping("/{roomId}")
    public ApiResponse<RoomResponseDto> updateRoom(
            @PathVariable("roomId") Long roomId,
            @RequestBody RoomUpdateRequestDto requestDto
    ) {
        log.debug("세대 수정 요청");
        return ApiResponse.success(roomService.updateRoom(roomId, requestDto));
    }

    // ✅ 세대 삭제
    @DeleteMapping("/{roomId}")
    public ApiResponse<Void> deleteRoom(@PathVariable("roomId") Long roomId) {
        log.debug("세대 삭제 요청");
        roomService.deleteRoom(roomId);
        return ApiResponse.success();
    }
}
