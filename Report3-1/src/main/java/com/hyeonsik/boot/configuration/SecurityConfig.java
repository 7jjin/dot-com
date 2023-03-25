package com.hyeonsik.boot.configuration;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hyeonsik.boot.service.CustomOAuth2UserService;
import com.hyeonsik.boot.service.UserService;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	public final UserService userService;
	AuthenticationManager authenticationManager;
    private final CustomOAuth2UserService customOAuth2UserService;
	
    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
    
    
    @Bean
    public WebSecurityCustomizer assetCustomizer() {
        return (web -> web.ignoring().antMatchers("/css/**", "/script/**", "image/**", "/fonts/**", "lib/**"));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    	
    	http
                
                .csrf().disable()
            
                .authorizeRequests()
                // 로그인 권한은 누구나, resources파일도 모든권한
                .antMatchers("/login", "/mainpage",  "/logout", "/register","/user_access", "/access_denied", "/resources/**").permitAll()
                .antMatchers("/").authenticated()
                
                .and()
                .formLogin()
                // 로그인 url 설정
                .loginPage("/mainpage")
                // 로그인 처리 로직 url 설정
                .loginProcessingUrl("/login_proc")
                // 로그인 성공시 리다이렉트 url 설정
                .defaultSuccessUrl("/mainpage")
                // 로그인 실패시 리다이렉트 url 설정s
                .failureUrl("/access_denied") // 인증에 실패했을 때 보여주는 화면 url, 로그인 form으로 파라미터값 error=true로 보낸다.
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/mainpage")
                .deleteCookies("JSESSIONID", "remember-me")
                .and()
                .oauth2Login().loginPage("/login")
                .defaultSuccessUrl("/mainpage")
                .userInfoEndpoint() // oauth2 로그인 성공 후 가져올 때의 설정들
                .userService(customOAuth2UserService);
    	
    			
                     //로그인 창
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