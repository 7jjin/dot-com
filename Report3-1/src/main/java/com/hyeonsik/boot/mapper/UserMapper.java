package com.hyeonsik.boot.mapper;

import com.hyeonsik.boot.vo.MapVo;
import com.hyeonsik.boot.vo.MenuVo;
import com.hyeonsik.boot.vo.UserVo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    // 로그인
    UserVo getUserAccount(String userId);

    // 회원가입
    void saveUser(UserVo userVo);
    
    public  int updateImg(String savedNm, String userId); 
    

    void createMemberKakao(UserVo userVo);
    
    //아이디 중복확인
    public int idOverlap(String userId) throws Exception;
    
    //아이디 찾기
    String searchId(@Param("userName")String userName, @Param("userEmail")String userEmail);
    
    String searchPw(@Param("userId")String userId, @Param("userEmail")String userEmail);
    
    
    int searchPassword(String userId, String userEmail, String key);
    
    
    List<MapVo> Mapfound(MapVo param) throws Exception;
    
    List<MapVo> Cafefound(MapVo param) throws Exception;
    
    public MapVo Menufound(int adminNo);
    
    
    List<MapVo> found(@Param("latitude") double latitude, @Param("longitude") double longitude);
    
    
 
}

