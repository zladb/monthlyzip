package com.monthlyzip.domain.auth.service;

<<<<<<< HEAD
import com.monthlyzip.domain.auth.entity.MemberEntity;
import com.monthlyzip.domain.auth.model.dto.CustomUserDetails;
import com.monthlyzip.domain.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
=======
import com.monthlyzip.domain.auth.dto.CustomUserDetails;
import com.monthlyzip.domain.member.entity.Member;
import com.monthlyzip.domain.member.repository.MemberRepository;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

<<<<<<< HEAD
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
=======
    private final MemberRepository memberRepository;

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

<<<<<<< HEAD
        MemberEntity member = userRepository.findByEmail(email)
=======
        Member member = memberRepository.findByEmail(email)
>>>>>>> bfc973d2df63ff798c3ade1e6236d752808e745c
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(member);
    }
}
