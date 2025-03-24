package com.monthlyzip.domain.auth.service;

import com.monthlyzip.domain.auth.entity.MemberEntity;
import com.monthlyzip.domain.auth.model.dto.JoinDto;
import com.monthlyzip.domain.auth.model.enums.MemberType;
import com.monthlyzip.domain.auth.repository.UserRepository;
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
        String name = joinDto.getName();
        String phoneNumber = joinDto.getPhoneNumber();
        MemberType memberType = joinDto.getMemberType(); // Enum 사용

        // 이메일 중복 검사
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("이미 가입된 이메일입니다."); // 예외 발생
        }

        MemberEntity data = new MemberEntity();
        data.setEmail(email);
        // 패스워드 암호화 적용
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setName(name);
        data.setPhoneNumber(phoneNumber);
        data.setMemberType(memberType); // Enum 저장

        System.out.println("JoinService : " + "회원가입 성공 : email = " + email + ", name = " + name);

        userRepository.save(data);
    }
}
