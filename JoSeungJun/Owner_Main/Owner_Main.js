const Btn = document.querySelector('.Left');
const ON = document.querySelector('.OnText');
const OFF = document.querySelector('.OffText');
const logout = document.querySelector(".IconZone2 logout");

Btn.addEventListener("click", () => {
    if (OFF.style.display === "block") {
        ON.style.display = "block";
        OFF.style.display = "none";
    }
    else if (OFF.style.display === "none") {
        ON.style.display = "none";
        OFF.style.display = "block";
    }
})

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
logout.addEventListener("click",admin_logout());

