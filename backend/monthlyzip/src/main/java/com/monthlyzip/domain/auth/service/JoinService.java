package com.monthlyzip.domain.auth.service;

import com.monthlyzip.domain.auth.entity.UserEntity;
import com.monthlyzip.domain.auth.model.dto.JoinDto;
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

        String name = joinDto.getUsername();
        String password = joinDto.getPassword();

        Boolean isExist = userRepository.existsByUsername(name);

        if (isExist) {
            return;
        }

        UserEntity data = new UserEntity();
        data.setUsername(name);
        // 패스워드 암호화 적용
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setRole("ROLE_ADMIN");

        userRepository.save(data);
    }
}
