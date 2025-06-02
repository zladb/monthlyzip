package com.monthlyzip.domain.room.controller;

<<<<<<< HEAD
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
=======
import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.room.model.dto.request.RoomBatchRequestDto;
import com.monthlyzip.domain.room.model.dto.request.RoomUpdateRequestDto;
import com.monthlyzip.domain.room.model.dto.response.RoomDetailResponseDto;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import com.monthlyzip.domain.room.model.dto.response.RoomResponseDto;
import com.monthlyzip.domain.room.service.RoomService;
import com.monthlyzip.global.common.model.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
<<<<<<< HEAD
=======
import org.springframework.security.core.annotation.AuthenticationPrincipal;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
<<<<<<< HEAD
@RequestMapping("/api/room")
=======
@RequestMapping("/api/rooms")
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // ✅ 세대 생성
    @PostMapping
<<<<<<< HEAD
    public ApiResponse<List<RoomResponseDto>> createRooms(@RequestBody @Valid RoomBatchRequestDto batchRequestDto) {
        log.debug("세대 일괄 생성 요청 - 건물 ID: {}, 세대 수: {}", batchRequestDto.getPropertyId(), batchRequestDto.getRooms().size());
        return ApiResponse.success(roomService.createRooms(batchRequestDto));
    }



    // ✅ 세대 목록 조회 (건물 기준)
    @GetMapping
    public ApiResponse<List<RoomResponseDto>> getRooms(@RequestParam("propertyId") Long propertyId) {
        log.debug("세대 목록 조회 요청");
        return ApiResponse.success(roomService.getRooms(propertyId));
=======
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
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    }

    // ✅ 세대 상세 조회
    @GetMapping("/{roomId}")
<<<<<<< HEAD
    public ApiResponse<RoomResponseDto> getRoomById(@PathVariable("roomId") Long roomId) {
        log.debug("세대 상세 조회 요청");
        return ApiResponse.success(roomService.getRoomById(roomId));
=======
    public ApiResponse<RoomDetailResponseDto> getRoomById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId) {
        log.debug("세대 상세 조회 요청");
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.getRoomById(memberId, roomId));
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    }

    // ✅ 세대 수정
    @PatchMapping("/{roomId}")
<<<<<<< HEAD
    public ApiResponse<RoomResponseDto> updateRoom(
            @PathVariable("roomId") Long roomId,
            @RequestBody RoomUpdateRequestDto requestDto
    ) {
        log.debug("세대 수정 요청");
        return ApiResponse.success(roomService.updateRoom(roomId, requestDto));
=======
    public ApiResponse<RoomDetailResponseDto> updateRoom(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId,
            @RequestBody RoomUpdateRequestDto requestDto) {
        log.debug("세대 수정 요청");
        Long memberId = userDetails.getMember().getId();
        return ApiResponse.success(roomService.updateRoom(memberId, roomId, requestDto));
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    }

    // ✅ 세대 삭제
    @DeleteMapping("/{roomId}")
<<<<<<< HEAD
    public ApiResponse<Void> deleteRoom(@PathVariable("roomId") Long roomId) {
        log.debug("세대 삭제 요청");
        roomService.deleteRoom(roomId);
        return ApiResponse.success();
    }
}
=======
    public ApiResponse<Void> deleteRoom(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable("roomId") Long roomId) {
        log.debug("세대 삭제 요청");
        Long memberId = userDetails.getMember().getId();
        roomService.deleteRoom(memberId, roomId);
        return ApiResponse.success();
    }
}
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
