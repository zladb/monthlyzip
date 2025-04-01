package com.monthlyzip.domain.auth.service;

import com.monthlyzip.domain.auth.entity.MemberEntity;
import com.monthlyzip.domain.auth.model.dto.JoinDto;
import com.monthlyzip.domain.auth.model.enums.MemberType;
import com.monthlyzip.domain.auth.repository.UserRepository;
import com.monthlyzip.global.common.exception.exception.BusinessException;
import com.monthlyzip.global.common.model.dto.ApiResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor  // 생성자 주입 받기
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinProcess(JoinDto joinDto) {

        String email = joinDto.getEmail();
        String password = joinDto.getPassword();
        String confirmPassword = joinDto.getConfirmPassword();
        String name = joinDto.getName();
        String phoneNumber = joinDto.getPhoneNumber();
        MemberType memberType = joinDto.getMemberType(); // Enum 사용

        // ******* ******* ******* 유효성 검사
        // 이메일 중복 검사
        if (userRepository.existsByEmail(email)) {
            throw new BusinessException(ApiResponseStatus.EMAIL_DUPLICATE);
        }

        // 비밀번호 일치 여부 확인
        if (!password.equals(confirmPassword)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_MISMATCH);
        }

        String passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$";
        if (!password.matches(passwordPattern)) {
            throw new BusinessException(ApiResponseStatus.PASSWORD_INVALID);
        }
        // ******* ******* *******

        // 데이터 저장 부분
        MemberEntity data = new MemberEntity();
        data.setEmail(email);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setName(name);
        data.setPhoneNumber(phoneNumber);
        data.setMemberType(memberType); // Enum 저장

        System.out.println("JoinService : " + "회원가입 성공 : email = " + email + ", name = " + name);

        userRepository.save(data);
    }
}
