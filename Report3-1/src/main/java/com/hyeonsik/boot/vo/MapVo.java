package com.hyeonsik.boot.vo;
import lombok.Builder;

import lombok.Data;

import java.time.LocalTime;
import java.util.List;

import org.locationtech.jts.geom.Point;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;




@Data
public class MapVo {
	 private int adminNo;
	 private String adminCafe;
	 private String guName;
	 private String addressName;
	 private Point clty_loc;
	 private String storeIntroduce;
	 private String foodType;
	 private String savedNm;
	 private LocalTime openingTime;
	 private LocalTime closingTime;
	 private int weekday;
	 private String storePhone;
	 private double latitude;
	 private double longitude;
	 private List<MenuVo> menuList;
}
