package com.hyeonsik.boot.configuration;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.hyeonsik.boot.service.UserService;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	public final UserService userService;
	AuthenticationManager authenticationManager;

    @Bean
    public WebSecurityCustomizer assetCustomizer() {
        return (web -> web.ignoring().antMatchers("/css/**", "/script/**", "image/**", "/fonts/**", "lib/**"));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
                .authorizeRequests()
                // 로그인 권한은 누구나, resources파일도 모든권한
                .antMatchers("/login", "/logout", "/register","/user_access", "/access_denied", "/resources/**").permitAll()
                // "/" 도메인 접근 허용
                .antMatchers("/").authenticated()
                .and()
                .formLogin()
                // 로그인 url 설정
                .loginPage("/login")
                // 로그인 처리 로직 url 설정
                .loginProcessingUrl("/login_proc")
                // 로그인 성공시 리다이렉트 url 설정
                .defaultSuccessUrl("/user_access")
                // 로그인 실패시 리다이렉트 url 설정
                .failureUrl("/access_denied") // 인증에 실패했을 때 보여주는 화면 url, 로그인 form으로 파라미터값 error=true로 보낸다.
                .and()
                .csrf().disable();        //로그인 창
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
           	
    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
    }