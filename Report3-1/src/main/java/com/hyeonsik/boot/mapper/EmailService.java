package com.hyeonsik.boot.mapper;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import com.hyeonsik.boot.vo.UserVo;


public interface EmailService {
	
	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;
	
	public MimeMessage createMessage2(String userId, String userEmail, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException;

	String createKey();

	String sendSimpleMessage(String to) throws Exception;

	

	

}
