//package com.monthlyzip.building.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.monthlyzip.building.model.dto.BuildingRequestDto;
//import com.monthlyzip.building.model.dto.BuildingResponseDto;
//import com.monthlyzip.building.service.BuildingService;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.BeforeEach;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(BuildingController.class)
//class BuildingControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private BuildingService buildingService;
//
//    @Autowired
//    private ObjectMapper objectMapper; // JSON 변환을 위한 ObjectMapper
//
//    private BuildingRequestDto requestDto;
//    private BuildingResponseDto responseDto;
//
//    @BeforeEach
//    void setUp() {
//        requestDto = new BuildingRequestDto(1L, "서울 강남구", "한솔 빌딩");
//        responseDto = new BuildingResponseDto(1L, "서울 강남구", "한솔 빌딩");
//    }
//
//    @Test
//    @DisplayName("건물 생성 API 테스트 - 정상 요청")
//    void createBuilding_Success() throws Exception {
//        // given
//        Mockito.when(buildingService.createBuilding(any(BuildingRequestDto.class))).thenReturn(responseDto);
//
//        // when & then
//        mockMvc.perform(post("/building")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(requestDto))) // JSON 변환
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(responseDto.getId()))
//                .andExpect(jsonPath("$.address").value(responseDto.getAddress()))
//                .andExpect(jsonPath("$.buildingName").value(responseDto.getBuildingName()));
//    }
//
//    @Test
//    @DisplayName("건물 생성 API 테스트 - 잘못된 요청")
//    void createBuilding_InvalidRequest() throws Exception {
//        // given (잘못된 요청 데이터)
//        BuildingRequestDto invalidRequest = new BuildingRequestDto(null, "", ""); // ownerId 없음, address 없음
//
//        // when & then
//        mockMvc.perform(post("/building")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(invalidRequest)))
//                .andExpect(status().isBadRequest()); // 400 Bad Request 예상
//    }
//}
