//package com.monthlyzip.domain.autotransfer.service;
//
//
//import com.monthlyzip.domain.autotransfer.entity.AutoTransfer;
//import com.monthlyzip.domain.autotransfer.repository.AutoTransferRepository;
//import com.monthlyzip.domain.contract.repository.ContractRepository;
//import com.monthlyzip.domain.member.entity.Member;
//import com.monthlyzip.domain.member.repository.MemberRepository;
//import com.monthlyzip.global.common.exception.exception.BusinessException;
//import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class AutoTransferService {
//
//    private final AutoTransferRepository autoTransferRepository;
//    private final ContractRepository contractRepository;
//    private final MemberRepository memberRepository;
//
////    public AutoTransfer initAutoTransfer(Long memberId) {
////        Member member = memberRepository.findById(memberId)
////                .orElseThrow(() -> throw new BusinessException(ApiResponseStatus.MEMBER_NOT_FOUND));
////
////
////
////    }
//}
