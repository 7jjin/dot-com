package com.hyeonsik.boot.service;

import com.hyeonsik.boot.mapper.UserMapper;
import com.hyeonsik.boot.vo.MapVo;
import com.hyeonsik.boot.vo.UserVo;
import lombok.RequiredArgsConstructor;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{
	
	  @Autowired
	  SqlSession sqlSession;
	
    SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:sss");
    Date time = new Date();
    String localTime = format.format(time);
    
    private final UserMapper userMapper;

  
    
    @Transactional
    public void joinUser(UserVo userVo){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        userVo.setUserPw(passwordEncoder.encode(userVo.getPassword()));
        userVo.setUserAuth("ROLE_USER");
        userVo.setAppendDate(localTime);
        userVo.setUpdateDate(localTime);
        userMapper.saveUser(userVo);
    }
    
    
    
    @Transactional
    public void joinAdmin(UserVo userVo){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        userVo.setUserPw(passwordEncoder.encode(userVo.getPassword()));
        userVo.setUserAuth("ROLE_ADMIN");
        userVo.setAppendDate(localTime);
        userVo.setUpdateDate(localTime);
        userMapper.saveUser(userVo);
    }
    

    @Override
    public UserVo loadUserByUsername(String userId) throws UsernameNotFoundException {
        //여기서 받은 유저 패스워드와 비교하여 로그인 인증
        UserVo userVo = userMapper.getUserAccount(userId);
        if (userVo == null){
            throw new UsernameNotFoundException("User not authorized.");
        }
        return userVo;
    }
    

    public int idOverlap(String userId) throws Exception {
    	int count = userMapper.idOverlap(userId);
        return count;
    }
    
    public MapVo storefound(int adminNo) {
    	return userMapper.Menufound(adminNo);
    }
    
    public List<MapVo> found(double latitude, double longitude) {
    	return userMapper.found(latitude,longitude);
    }
    
    
   
    public int upImg(String savedNm ,String userId) throws Exception  {   
    	return userMapper.updateImg(savedNm, userId);
     
    }
    
    public static double distanceInKilometerByHaversine(double x1, double y1, double x2, double y2) {
        double distance;
        double radius = 6371; // 지구 반지름(km)
        double toRadian = Math.PI / 180;

        double deltaLatitude = Math.abs(x1 - x2) * toRadian;
        double deltaLongitude = Math.abs(y1 - y2) * toRadian;

        double sinDeltaLat = Math.sin(deltaLatitude / 2);
        double sinDeltaLng = Math.sin(deltaLongitude / 2);
        double squareRoot = Math.sqrt(
            sinDeltaLat * sinDeltaLat +
            Math.cos(x1 * toRadian) * Math.cos(x2 * toRadian) * sinDeltaLng * sinDeltaLng);

        distance = 2 * radius * Math.asin(squareRoot);

        return distance;
    } 
    
    
    
}