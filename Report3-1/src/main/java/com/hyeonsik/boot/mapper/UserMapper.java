package com.hyeonsik.boot.mapper;

import com.hyeonsik.boot.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    // 로그인
    UserVo getUserAccount(String userId);

    // 회원가입
    void saveUser(UserVo userVo);
    
	public int overlappedID(UserVo userVo) throws Exception;
    
}