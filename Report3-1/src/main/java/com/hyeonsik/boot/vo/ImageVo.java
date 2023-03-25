package com.hyeonsik.boot.vo;
import lombok.Builder;

import lombok.Data;
import org.locationtech.jts.geom.Point;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;




@Data
public class ImageVo {
	 private int fileId;
	 private String orgNm;
	 private String savedNm;
	 private String savedPath;

}
