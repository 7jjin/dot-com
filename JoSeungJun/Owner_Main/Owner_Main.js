const logout = document.querySelector(".logout");

// 로그아웃 버튼 이벤트
function admin_logout(){
fetch("http://localhost:4000/",{
  method:"POST",
  })
  .then(res=>{
      return res.json();
  })
  .catch(error=>{
      console.log(error);
  });
}

// 로그아웃 버튼 이벤트
logout.addEventListener("click",admin_logout)

