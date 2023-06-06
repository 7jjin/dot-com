const Bar_slider = document.querySelector(".barlist");
const Photo_slider = document.querySelector(".PhotoList");
// 인원수 가로 스크롤
// ---------------------------------------------------------------------------
let isMouseDown = false;
let startX, scrollLeft;

function slider(Element) {
  document.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    scrollLeft = Element.scrollLeft;
    startX = e.pageX - Element.offsetLeft;
  });

  document.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  document.addEventListener("mouseup", (e) => {
    isMouseDown = false;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - Element.offsetLeft;
    const walk = (x - startX) * 1;
    Element.scrollLeft = scrollLeft - walk;
  });
}

// 플로팅 버튼
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");
const Tip = document.querySelector(".remote_Tip");

window.addEventListener("scroll", function () {
  bar.style.top = `${window.scrollY + 90}px`;
  bar.style.transition = "all 0.7s ease-out";
  Tip.style.top = `${window.scrollY + 90}px`;
  Tip.style.transition = "all 0.7s ease-out";

  if (window.scrollY === 0) {
    bar.style.top = "100px";
  }
  if (window.scrollY === 0) {
    Tip.style.top = "100px";
  }
});

// 가로 스크롤 - 버튼 누르면 해당 버튼의 색이 변하고 다른 버튼을 누르면 해제되는 함수
// ----------------------------------------------------------------------------
function change_btn(e) {
  var btns = document.querySelectorAll(".number span");
  btns.forEach(function (btn) {
    if (e.currentTarget == btn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// 인원을 고르면 플로팅 바의 모양이 바뀜
//--------------------------------------------------------------------------------
const number = document.querySelectorAll(".number span");
const storename = document.querySelector(".name");

let cart = []; // 장바구니 배열
let list = {}; // 서버에 보낼 리스트

const uni1 = sessionStorage.getItem("selectedValue");
const url1 = `http://localhost:4000/store?adminNo=${uni1}`;
fetch(url1)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    list.가게이름 = data[0].adminCafe;
    list.전화번호 = data[0].storePhone;
  })
  .catch((err) => console.log(err));
// fetch함수로 API가져와서 바로 객체에 데이터 넣어주기 )가게이름,전화번호

function getCurrentDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const timeStr = hours + ":" + minutes + ":" + seconds;
  const today = `${dateStr} ${timeStr}`;
  return today;
}
//현재 시간을 알려주는 함수

number.forEach((item, index) => {
  item.addEventListener("click", function (e) {
    bar.style.borderRadius = "20px";
    bar.style.justifyContent = "flex-Start";
    bar.style.marginLeft = "";
    bar.style.width = "220px";
    bar.style.right = "-35%";
    bar.style.flexDirection = "column";
    bar.style.height = "none";
    bar.style.alignItems = "normal";
    bar.innerHTML = `<div class="member">
    <div>인원:</div>
    <div>${e.target.innerText}</div>
    </div>
    <div class="bottomline"></div>
    <div class="menuBoxOuter"></div>
    <div class="costHap"></div>
    <div class="count" </div>`;
    list.인원 = `${Number(e.target.innerText[0])}`;

    NumText.innerHTML = e.target.innerText;
  });
});
// 리모트바 원형에서 직사각형으로 모형 바꾸기

// 인원 추가하기
// -------------------------------------------------------------------------------------------------------

function plus(el) {
  let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
  const result = el.parentNode.parentNode.childNodes[3].childNodes[3]; //총 인원태그
  let cost = el.parentNode.parentNode.firstElementChild.childNodes[3]; //총 가격태그
  let total =
    el.parentNode.parentNode.firstElementChild.childNodes[3].innerText; //총 가격
  let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
  const realcost =
    el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute(
      "value"
    ); //메뉴 하나당 가격(불변)
  number = parseInt(number) + 1;
  total = parseInt(total) + parseInt(realcost);
  result.innerText = number;
  cost.innerText = `${total}`;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === uni) {
      cart[i].price = total; // 변화된 가격을 각각의 요소에 맞는 객체를 찾아서 바꿔준다.
      cart[i].quantity = number;
    }
  }
  hap();
}

function minus(el) {
  let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
  const result = el.parentNode.parentNode.childNodes[3].childNodes[3]; //총 인원태그
  let cost = el.parentNode.parentNode.firstElementChild.childNodes[3]; //총 가격태그
  let total =
    el.parentNode.parentNode.firstElementChild.childNodes[3].innerText; //총 가격
  let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
  const realcost =
    el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute(
      "value"
    ); //메뉴 하나당 가격(불변)
  if (number > 1) {
    // 수량이 1 이상일때마 작동
    number = parseInt(number) - 1;
    total = parseInt(total) - parseInt(realcost);
  }
  result.innerText = number;
  cost.innerText = `${total}`;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === uni) {
      cart[i].price = total;
      cart[i].quantity = number;
    }
  }

  hap();
}

function del(el) {
  //박스 삭제
  let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
  let menuBox = el.parentNode.parentNode.parentNode;
  menuBox.remove();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === uni) {
      cart.splice(i, 1);
    }
  }

  hap();
}

function hap() {
  var hapcost = 0;
  const hapdiv = document.querySelector(".hap");
  for (let i = 0; i < cart.length; i++) {
    hapcost += Number(cart[i].price);
  }
  hapdiv.innerText = hapcost;
  CostNum.innerText = hapcost;
}

//데이터(인원,메뉴) 내보내는 함수
//--------------------------------------------------------------------------------------------

function sent() {
  list.현재시간 = getCurrentDateTime();
  fetch("http://localhost:4000/list", {
    method: "post",
    body: JSON.stringify(list),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })
    .then(() => {
      location.href = "/JoJinHyeong/mainPage/main.html";
    })
    .catch((error) => {
      alert("실패", error);
    });
}

// json-server --watch db.json  가상서버 실행

// 버튼 누르면 해당 이벤트 적용
// --------------------------------------------------------------------------------------------

const Filter = document.querySelector(".filter");
const Blank = document.querySelector(".blank");
const HomeTab = document.querySelector(".homeTab");
const MenuTab = document.querySelector(".MenuTab");
const PhotoTab = document.querySelector(".photoTab");
const ReviewTab = document.querySelector(".userReviewTab");
const Home = document.querySelector(".store_Home");
const Home_Top = window.pageYOffset + Home.getBoundingClientRect().top;
const Menu = document.querySelector(".store_Menu");
const Menu_Top = window.pageYOffset + Menu.getBoundingClientRect().top;
const ReviewMore = document.querySelector(".ReviewMore");
const ReviewMore1 = document.querySelector(".ReviewMore1");
const ReviewBox = document.querySelector(".ReviewBox");
const PhotoMore = document.querySelector(".PhotoMore");
const PhotoBox = document.querySelector(".PhotoBox");
const Right = document.querySelector(".Right");
const Left = document.querySelector(".Left");
const PhotoReduce = document.querySelector(".PhotoReduce");
const ReviewReduce = document.querySelector(".ReviewReduce");

function Top() {
  if (window.scrollY > 625) {
    Filter.style.position = "fixed";
    Filter.style.top = "0";
  } else if (window.scrollY < 625) {
    Filter.style.position = "";
    Filter.style.top = "";
  }
}

function Move(element) {
  window.scroll({ top: element - 60, behavior: "smooth" });
}
function Expansion(Element) {
  var addHeight = 1000;
  var currentHeight = Element.clientHeight;
  var newHeight = currentHeight + addHeight;

  Element.style.height = newHeight + "px";
}

HomeTab.addEventListener("click", function () {
  Move(Home_Top);
});
MenuTab.addEventListener("click", function () {
  Move(Menu_Top);
});

Bar_slider.addEventListener("mousemove", function () {
  slider(Bar_slider);
});
Photo_slider.addEventListener("mousemove", function () {
  slider(Photo_slider);
});

window.addEventListener("scroll", () => {
  Top();
});

PhotoMore.addEventListener("click", () => {
  PhotoBox.style.height = "1000px";
  PhotoMore.style.display = "none";
  PhotoReduce.style.display = "block";
  Right.style.visibility = "hidden";
  Left.style.visibility = "hidden";
});

PhotoReduce.addEventListener("click", () => {
  PhotoBox.style.height = "200px";
  PhotoMore.style.display = "block";
  PhotoReduce.style.display = "none";
});
ReviewReduce.addEventListener("click", () => {
  ReviewBox.style.height = "600px";
  ReviewMore.style.display = "block";
  ReviewReduce.style.display = "none";
});

ReviewMore1.addEventListener("click", () => {
  Expansion(ReviewBox);
  ReviewMore.style.display = "none";
  ReviewReduce.style.display = "block";
});

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
//  반응형
//  스크롤을 내리면 유틸바 사라지고 다시 올라갔을때도 사라지게 함.
const toggleBar = document.querySelector(".headerUtil_toggleBar");
const header = document.querySelector(".header");
let toggle_info_Bar = true;
let toggle_search_Bar = true;
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
    search_box_moblie.style.height = "95px";
    toggle_search_Bar = !toggle_search_Bar;
  } else {
    search_box_moblie.style.height = "0px";
    toggle_search_Bar = !toggle_search_Bar;
  }
}
