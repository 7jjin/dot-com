package com.hyeonsik.boot.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyeonsik.boot.mapper.UserMapper;
import com.hyeonsik.boot.service.RegisterMail;

import com.hyeonsik.boot.service.UserService;

import com.hyeonsik.boot.vo.ImageVo;
import com.hyeonsik.boot.vo.MapVo;
import com.hyeonsik.boot.vo.Member;
import com.hyeonsik.boot.vo.MenuVo;
import com.hyeonsik.boot.vo.UserVo;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RegisterMail registerMail;
    //private final UploadFile uploadFile;
    
    @Autowired
	SqlSession ss; 
    
    @Autowired
    UserMapper userMapper;
 
 
    
    
     @GetMapping("/")
     public String rootform(){
     return "redirect:/mainpage";
    }
    
    /**
     * 로그인 폼
     * @return
     */
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    
 
    @GetMapping("/signUp")
    public String signUpForm() {
        return "signUp";
    }
    
    @GetMapping("/signUp_host")
    public String signUphostForm() {
        return "signUp_host";
    }
    
     
    @GetMapping("/findinfo")
    public String findfindForm() {
        return "findinfo";
    }
   
    @ResponseBody
    @PostMapping("/mailCheck")
    String mailConfirm(@RequestParam("userEmail") String userEmail) throws Exception {
       String code = registerMail.sendSimpleMessage(userEmail);
       return code;
    }
    
    
  
   
	List<MapVo> list = new ArrayList<>(); 
    @GetMapping("/access_denied")
    public String mapfo(Model model) throws Exception{
    	list = ss.selectList("com.hyeonsik.boot.mapper.UserMapper.Mapfound");
		model.addAttribute("list",list);
		System.out.println(list);
		return "access_denied";
    }
    
  
    
    @GetMapping("/SignUp_Class")
    public String signupclass() {
        return "SignUp_Class";
    }
    

    @GetMapping("/store")
    public String store(@RequestParam final int adminNo ,Model model) throws JsonProcessingException{
    	MapVo map =userService.storefound(adminNo);
    	List<MenuVo> menuList = map.getMenuList();
        Map<String, List<MenuVo>> menuMap = new HashMap<>();
        for (MenuVo menu : menuList) {
            String category = menu.getCategoryName();
            List<MenuVo> categoryList = menuMap.getOrDefault(category, new ArrayList<>());
            categoryList.add(menu);
            menuMap.put(category, categoryList);
        }
        
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(menuMap);
        
        System.out.println(map);
        System.out.println(menuMap);
    	model.addAttribute("list", map);
    	 model.addAttribute("menuMapJson", json);
    	return "store";
    }
    
    @ResponseBody
    @PostMapping("/store")
    public List<Map<String, Object>> store1(@RequestBody List<Map<String, Object>> cart) {
    	
    	return cart;
    }
    
    
    @PostMapping("/signUp_host")
    public String signUp_host(UserVo userVo) {
        userService.joinAdmin(userVo);
        return "redirect:/login";
    }
    
   
    @PostMapping("/signUp")
    public String signUp(UserVo userVo) {
        userService.joinUser(userVo);
        return "redirect:/login";

    }
    
    //아이디 중복
    @ResponseBody
	@PostMapping("/idCheck")
    public int idOverlap(@RequestParam("userId") String userId ) throws Exception {
        int count = userService.idOverlap(userId);
        return count;  
	 }
    
    
    @PostMapping("/findinfo")
  	@ResponseBody
  	public String userIdSearch(@RequestParam("userName") String userName, 
  			@RequestParam("userEmail") String userEmail) {
  		String result = registerMail.get_searchId(userName,userEmail);
  		return result;
  	}
    

    
    @GetMapping("/passfind")
    public String passfindform() {
        return "passfind";
    }
    
    
	@PostMapping("/passfind")
	@ResponseBody
	public String passwordSearch(@RequestParam("id")String userId,
			@RequestParam("email")String userEmail,
			HttpServletRequest request) throws Exception {
		
		
		registerMail.mailSendWithPassword(userId, userEmail, request);
		
		return "passfind";
	}
	
	@GetMapping("/Mypage_Account")
	public String mypageAccount(Model model, Authentication authentication) throws IOException {
		   UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
		   model.addAttribute("infoImage", userVo.getSavedNm());
	       model.addAttribute("infoName", userVo.getUserName());
	       model.addAttribute("infoEmail", userVo.getUserEmail()); 
	       model.addAttribute("infoId", userVo.getUserId()); 
	       return "Mypage_Account";
	}
	
	
	@PostMapping("/Mypage_Account")
	public String mypageAccount2(Authentication authentication, Model model, @RequestParam("file") MultipartFile file, String userId) throws Exception {
		// String savedNm = uploadFile.saveFile(file);
		// System.out.println(savedNm);
		 UserVo userVo = (UserVo) authentication.getPrincipal();
		 model.addAttribute("infoImage", userVo.getSavedNm());
		 model.addAttribute("infoName", userVo.getUserName());
	     model.addAttribute("infoEmail", userVo.getUserEmail()); 
	     model.addAttribute("infoId", userVo.getUserId());
		 userId = userVo.getUserId();
		 System.out.println("userId = " + userId);
		// userService.upImg(savedNm, userId);
		 //userVo.setSavedNm(savedNm);
		 
	       return "Mypage_Account";
	}
	
	
	@GetMapping("/Mypage_Fav")
	public String MypageFav(Model model, Authentication authentication) {
		UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
	       model.addAttribute("infoName", userVo.getUserName());
	       model.addAttribute("infoEmail", userVo.getUserEmail()); 
	       model.addAttribute("infoId", userVo.getUserId());
		
		return "Mypage_Fav";
	}
	@GetMapping("/Mypage_Review")
	public String MypageReview(Model model, Authentication authentication) {
		UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
	       model.addAttribute("infoName", userVo.getUserName());
	       model.addAttribute("infoEmail", userVo.getUserEmail()); 
	       model.addAttribute("infoId", userVo.getUserId());
		return "Mypage_Review";
	}
	@GetMapping("/Mypage_History")
	public String MypageHistory(Model model, Authentication authentication) {
		UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
	       model.addAttribute("infoName", userVo.getUserName());
	       model.addAttribute("infoEmail", userVo.getUserEmail()); 
	       model.addAttribute("infoId", userVo.getUserId());
		return "Mypage_History";
	}
	@GetMapping("/Mypage_Restaurant")
	public String MypageRes(Model model, Authentication authentication) {
		UserVo userVo = (UserVo) authentication.getPrincipal();  //userDetail 객체를 가져옴
	       model.addAttribute("infoName", userVo.getUserName());
	       model.addAttribute("infoEmail", userVo.getUserEmail()); 
	       model.addAttribute("infoId", userVo.getUserId());
		return "Mypage_Restaurant";
	}
	
	  @GetMapping("/Confirm_Pass")
	    public String ConfirmPass() {
	        return "Confirm_Pass";
	    }
	
	  List<MapVo> list2 = new ArrayList<>(); 	
	  List<MapVo> list3 = new ArrayList<>(); 	
    @GetMapping("/mainpage")
	    public String usercAcess(Model model, Authentication authentication) {
	    if(authentication!=null) {	    
	    UserVo userVo = (UserVo) authentication.getPrincipal();	    
	    model.addAttribute("info", userVo.getUserName()+ "님");
	    }
	    list2 = ss.selectList("com.hyeonsik.boot.mapper.UserMapper.Cafefound");
	    double x1 = 37.400654249172604;
	    double x2 = 37.3834711;
	    double y1 = 126.92174376799079;
	    double y2 = 126.9218479;
	    double distance;
	    distance = UserService.distanceInKilometerByHaversine(x1,y1,x2,y2);
	    list3 = ss.selectList("com.hyeonsik.boot.mapper.UserMapper.found");
	    System.out.println(distance);
		System.out.println(list2);
		model.addAttribute("list",list2);
    
	  //OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
	  //Map<String, Object> attributes = oAuth2User.getAttributes();
      //model.addAttribute("name", attributes.get("name").toString()+"님");
	    
	   return "mainpage" ;
	    }
    
  
    
}