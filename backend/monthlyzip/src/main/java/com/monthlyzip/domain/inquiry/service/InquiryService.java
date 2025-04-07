package com.monthlyzip.domain.inquiry.service;

import com.monthlyzip.domain.contract.model.entity.Contract;
import com.monthlyzip.domain.contract.repository.ContractRepository;
import com.monthlyzip.domain.inquiry.model.dto.request.InquiryCreateRequestDto;
import com.monthlyzip.domain.inquiry.model.dto.request.InquiryUpdateRequestDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryCreateResponseDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryDetailResponseDto;
import com.monthlyzip.domain.inquiry.model.dto.response.InquiryResponseDto;
import com.monthlyzip.domain.inquiry.model.entity.Inquiry;
import com.monthlyzip.domain.inquiry.model.type.InquiryStatus;
import com.monthlyzip.domain.inquiry.model.type.InquiryType;
import com.monthlyzip.domain.inquiry.repository.InquiryRepository;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.enums.MemberType;
import com.monthlyzip.domain.member.repository.MemberRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.monthlyzip.global.common.utils.FileUtil;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final ContractRepository contractRepository;
    private final MemberRepository memberRepository;
    private final FileUtil fileUtil;

    @Transactional
    public InquiryCreateResponseDto createInquiry(Long memberId, InquiryCreateRequestDto dto, MultipartFile image) {
        // 1. 회원 존재 여부 확인
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 2. 사용자 유형 확인 (임차인만 문의 생성 가능)
        if (member.getMemberType() != MemberType.임차인) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);
        }

        // 3. 사용자의 가장 최근 계약 자동 조회
        Contract contract = contractRepository.findByTenantIdAndIsActiveTenantTrue(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.CONTRACT_NOT_FOUND));

        // 4. 이미지 업로드 처리
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = fileUtil.saveFile(image, "inquiry");
        }

        // 4. 문의 생성
        Inquiry inquiry = Inquiry.builder()
            .member(member)
            .contract(contract)
            .inquiryType(dto.getInquiryType())
            .title(dto.getTitle())
            .content(dto.getContent())
            .status(InquiryStatus.접수대기) // 초기 상태는 '접수'
            .imageUrl(imageUrl)  // List 대신 단일 문자열
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        // 5. 저장
        Inquiry savedInquiry = inquiryRepository.save(inquiry);

        // 6. 응답 반환
        return new InquiryCreateResponseDto(savedInquiry.getId());
    }

    @Transactional(readOnly = true)
    public List<InquiryResponseDto> getInquiries(Long memberId, String status, InquiryType inquiryType) {
        log.info("문의 전체 목록 조회 !! ");
        // 1. 회원 존재 여부 확인
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        List<Inquiry> inquiries;

        // 2. 사용자 유형에 따라 다른 목록 반환
        if (member.getMemberType() == MemberType.임대인) {
            // 임대인은 자신의 건물에 대한 모든 문의를 볼 수 있음
            if (status != null && !status.isEmpty() && inquiryType != null) {
                // 상태와 유형 모두로 필터링
                inquiries = inquiryRepository.findByContractLandlordIdAndStatus(
                        memberId, InquiryStatus.valueOf(status))
                    .stream()
                    .filter(inquiry -> inquiry.getInquiryType().equals(inquiryType))
                    .collect(Collectors.toList());
            } else if (status != null && !status.isEmpty()) {
                // 상태로만 필터링
                inquiries = inquiryRepository.findByContractLandlordIdAndStatus(
                    memberId, InquiryStatus.valueOf(status));
            } else if (inquiryType != null) {
                // 유형으로만 필터링
                inquiries = inquiryRepository.findByContractLandlordIdAndInquiryType(
                    memberId, inquiryType);
            } else {
                // 필터링 없음
                inquiries = inquiryRepository.findByContractLandlordId(memberId);
            }
        } else {
            // 임차인은 자신이 작성한 문의만 볼 수 있음
            if (status != null && !status.isEmpty() && inquiryType != null) {
                // 상태와 유형 모두로 필터링
                inquiries = inquiryRepository.findByMemberIdAndStatus(
                        memberId, InquiryStatus.valueOf(status))
                    .stream()
                    .filter(inquiry -> inquiry.getInquiryType().equals(inquiryType))
                    .collect(Collectors.toList());
            } else if (status != null && !status.isEmpty()) {
                // 상태로만 필터링
                inquiries = inquiryRepository.findByMemberIdAndStatus(
                    memberId, InquiryStatus.valueOf(status));
            } else if (inquiryType != null) {
                // 유형으로만 필터링
                inquiries = inquiryRepository.findByMemberIdAndInquiryType(
                    memberId, inquiryType);
            } else {
                // 필터링 없음
                inquiries = inquiryRepository.findByMemberId(memberId);
            }
        }

        // 3. DTO 변환 및 반환
        return inquiries.stream()
            .map(InquiryResponseDto::from)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InquiryDetailResponseDto getInquiryDetail(Long memberId, Long inquiryId) {
        // 1. 문의 존재 여부 확인
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.INQUIRY_NOT_FOUND));

        // 테스트 위해 권한 검사 임시 비활성화
        // 2. 회원 존재 여부 확인
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 3. 권한 확인
        boolean hasAccess = false;
        if (member.getMemberType() == MemberType.임대인) {
            // 임대인은 자신의 건물에 대한 문의만 조회 가능
            hasAccess = inquiry.getContract().getLandlordId().equals(memberId);
        } else {
            // 임차인은 자신이 작성한 문의만 조회 가능
            hasAccess = inquiry.getMember().getId().equals(memberId);
        }

        if (!hasAccess) {
            throw new BusinessException(ApiResponseStatus.FORBIDDEN);
        }

        // 4. 상세 정보 반환
        return InquiryDetailResponseDto.from(inquiry);
    }

    @Transactional()
    public InquiryResponseDto updateInquiry(Long memberId, Long inquiryId, InquiryUpdateRequestDto dto, MultipartFile newImage) {
        // 1. 문의 존재 여부 확인
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.INQUIRY_NOT_FOUND));

        // 2. 회원 존재 여부 확인
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));

        // 테스트 위해 권한 검사 임시 비활성화
        // 3. 권한 확인 (각 사용자 유형별로 다른 권한)
        if (member.getMemberType() == MemberType.임대인) {
            // 임대인은 자신의 건물에 대한 문의의 상태만 수정 가능
            if (!inquiry.getContract().getLandlordId().equals(memberId)) {
                throw new BusinessException(ApiResponseStatus.FORBIDDEN);
            }

            // 이미 처리 완료된 문의는 수정 불가
            if (inquiry.getStatus() == InquiryStatus.처리완료) {
                throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
            }

            // 상태 변경 로직
            if (dto.getStatus() != null) {
                if (Objects.requireNonNull(inquiry.getStatus()) == InquiryStatus.접수대기 &&
                    dto.getStatus() == InquiryStatus.처리중) {
                    inquiry.setStatus(dto.getStatus());
                } else {
                    throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
                }
            } else {
                throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
            }
        } else {
            // 임차인은 자신이 작성한 문의의 내용, 제목만 수정 가능 (접수 상태일 때만)
            if (!inquiry.getMember().getId().equals(memberId)) {
                throw new BusinessException(ApiResponseStatus.FORBIDDEN);
            }

            switch (inquiry.getStatus()) {
                case 접수대기:
                    // 접수대기 상태에서는 내용, 제목, 이미지 수정 가능
                    if (dto.getTitle() != null) {
                        inquiry.setTitle(dto.getTitle());
                    }
                    if (dto.getContent() != null) {
                        inquiry.setContent(dto.getContent());
                    }
                    if (dto.getInquiryType() != null) {
                        inquiry.setInquiryType(dto.getInquiryType());
                    }

                    // 이미지 업데이트
                    if (newImage != null && !newImage.isEmpty()) {
                        // 기존 이미지가 있으면 삭제
                        String oldImageUrl = inquiry.getImageUrl();
                        if (oldImageUrl != null && !oldImageUrl.isEmpty()) {
                            fileUtil.deleteFile(oldImageUrl);
                        }

                        // 새 이미지 저장
                        String newImageUrl = fileUtil.saveFile(newImage, "inquiry");
                        inquiry.setImageUrl(newImageUrl);
                    }
                    break;

                case 처리중:
                    // 처리중 상태: 처리완료로만 변경 가능
                    if (dto.getStatus() == InquiryStatus.처리완료) {
                        inquiry.setStatus(dto.getStatus());
                    } else {
                        throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
                    }
                    break;
                default:
                    // 그 외 상태(처리완료 등): 수정 불가
                    throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
            }

            // 이미지 업데이트 로직 추가
            if (newImage != null && !newImage.isEmpty()) {
                // 기존 이미지가 있으면 삭제
                String oldImageUrl = inquiry.getImageUrl();
                if (oldImageUrl != null && !oldImageUrl.isEmpty()) {
                    fileUtil.deleteFile(oldImageUrl);
                }

                // 새 이미지 저장
                String newImageUrl = fileUtil.saveFile(newImage, "inquiry");
                inquiry.setImageUrl(newImageUrl);
            }
        }

        // 4. 수정 시간 업데이트
        inquiry.setUpdatedAt(LocalDateTime.now());

        // 5. 저장 및 반환
        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return InquiryResponseDto.from(updatedInquiry);
    }

    @Transactional
    public void deleteInquiry(Long memberId, Long inquiryId) {
        // 1. 문의 존재 여부 확인
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
            .orElseThrow(() -> new BusinessException(ApiResponseStatus.INQUIRY_NOT_FOUND));

        // 2. 권한 확인 (임차인만 자신이 작성한 문의 삭제 가능)

        // 테스트 위해 권한 검사 임시 비활성화
         if (!inquiry.getMember().getId().equals(memberId)) {
             throw new BusinessException(ApiResponseStatus.FORBIDDEN);
         }

        // 3. 상태 확인 (접수 상태일 때만 삭제 가능)
        if (inquiry.getStatus() != InquiryStatus.접수대기) {
            throw new BusinessException(ApiResponseStatus.INQUIRY_INVALID_REQUEST);
        }

        log.debug("테스트 중: 문의 ID {} 삭제 허용 (사용자 ID: {})", inquiryId, memberId);
        // 4. 삭제
        inquiryRepository.delete(inquiry);
    }
}
