package com.hyeonsik.boot.vo;


import lombok.Getter;
import lombok.Setter;
import com.hyeonsik.boot.vo.Member;

@Getter
@Setter
public class MemberProfile {
    private String name;
    private String email;
    private String provider;

    public Member toMember() {
        return Member.builder()
                     .name(name)
                     .email(email)
                     .provider(provider)
                     .build();
    }

}