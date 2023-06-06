var slideIndex = 0; //slide index

const utilList = document.querySelector(".utilList");
const formps = document.querySelector(".formps");
const utilList_login = document.querySelector(".utilList_login");
const toggleOn = document.querySelector(".toggleOn");
fetch("http://localhost:4000/waitlist")
  .then((res) => res.json())
  .then((data) => {
    // 로그인 정보가 있을때
    if (data[0].name) {
      utilList_login.addEventListener("click", function () {
        location.href = "/JoSeungJun/MyPage_Account/MyPage_Account.html";
      });

      let btn = document.createElement("button");
      let btn_Moblie = document.createElement("div");
      let btn_Myinfo = document.createElement("div");
      btn_Moblie.setAttribute("class", "logout");
      btn_Myinfo.setAttribute("class", "Myinfo");
      btn_Moblie.innerHTML = "로그아웃";
      btn_Myinfo.innerHTML = "내정보";
      btn.innerHTML = "로그아웃";
      formps.appendChild(btn);
      toggleOn.appendChild(btn_Myinfo);
      toggleOn.appendChild(btn_Moblie);
      btn_Myinfo.addEventListener("click", function () {
        location.href = "/JoSeungJun/MyPage_Account/MyPage_Account.html";
      });
    } else {
      let login = document.createElement("div");
      login.setAttribute("class", "login");
      login.innerHTML = "회원가입";
      toggleOn.appendChild(login);
      toggleOn.style.Height = "65px";
      login.addEventListener("click", function () {
        location.href = "/JoJinHyeong/loginPage/login.html";
      });
    }
  })
  .catch((err) => console.log(err));

// HTML 로드가 끝난 후 동작
window.onload = function () {
  showSlides(slideIndex);
  var sec = 3000;
  setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, sec);
};

function moveSlides(n) {
  slideIndex = slideIndex + n;
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  var size = slides.length;

  if (n + 1 > size) {
    slideIndex = 0;
    n = 0; // 슬라이드가 다돌면 다시 처음으로
  } else if (n < 0) {
    slideIndex = size - 1; // 슬라이드가 첫번째에서 뒤로더가면 끝으로 이동
    n = size - 1;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // 해당
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[n].style.display = "block";
  dots[n].className += " active";
}

//  반응형
//  스크롤을 내리면 유틸바 사라지고 다시 올라갔을때도 사라지게 함.
const toggleBar = document.querySelector(".headerUtil_toggleBar");

const header = document.querySelector(".header");
let toggle_info_Bar = true;
let toggle_search_Bar = true;
// const headerHeight =
//   header.getBoundingClientRect().height + subBar.getBoundingClientRect().height;
// document.addEventListener("scroll", () => {
//   if (window.scrollY > headerHeight) {
//     subBar.style.display = "none";
//     toggle = !toggle;
//   } else {
//     subBar.style.display = "flex";
//     subBar.style.height = "0px";
//   }
// });

// 토클 버튼누르면 유틸바 내려옴
function showList() {
  fetch("http://localhost:4000/waitlist")
    .then((res) => res.json())
    .then((data) => {
      //로그인 했을 때
      if (toggle_info_Bar) {
        if (data[0].name) toggleOn.style.height = "120px";
        else toggleOn.style.height = "64px";
        toggle_info_Bar = !toggle_info_Bar;
      }
      //로그인 안했을 때
      else {
        toggleOn.style.height = "0px";
        toggle_info_Bar = !toggle_info_Bar;
      }
    });
}

//반응형일 떄 검색 버튼 함수
const search_box_moblie = document.querySelector(".search_box_moblie");
function showSearch() {
  if (toggle_search_Bar) {
    search_box_moblie.style.height = "120px";
    toggle_search_Bar = !toggle_search_Bar;
  } else {
    search_box_moblie.style.height = "0px";
    toggle_search_Bar = !toggle_search_Bar;
  }
}
