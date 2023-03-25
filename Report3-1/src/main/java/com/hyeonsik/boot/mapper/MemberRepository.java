package com.hyeonsik.boot.mapper;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hyeonsik.boot.vo.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndProvider(String email, String provider);
}