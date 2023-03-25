package com.hyeonsik.boot.vo;

import lombok.Builder;
import lombok.Data;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.nimbusds.oauth2.sdk.Role;

import java.util.Collection;
import java.util.Collections;

@Data
public class UserVo implements UserDetails {
	

    private int userNo;
    private String userId;
    private String userPw;
    private String userName;
    private String userAuth;
    private String Authkey; // 인증키
    private int Authstatus; // 권한확인
    private String userPhone;
    private String userEmail;
    private String userBirth;
    private String appendDate;
    private String updateDate;
    private String userCafe;
    private String savedNm;
    
    
    UserVo memberIdSearch(UserVo userVo) {
		return null;
	}
    

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(this.userAuth));
    }

    @Override
    public String getPassword() {
        return this.userPw;
    }
    // 시큐리티의 userName
    // -> 따라서 얘는 인증할 때 id를 봄
    @Override
    public String getUsername() {
        return this.userId;
    }

    // Vo의 userName !
    public String getUserName(){
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    
    
    
    
    
}