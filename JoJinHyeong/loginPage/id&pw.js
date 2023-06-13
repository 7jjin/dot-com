const mainlogin = document.querySelector(".main_login");
const idInput = document.querySelector(".main_login .id");
const pwInput = document.querySelector(".main_login .password");
const id_remove = document.querySelector("#id_remove");
const pw_remove = document.querySelector("#pw_remove");
const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
const url = new URL(
  "https://dic.daum.net/word/view.do?wordid=ekw000033653&q=coffee가+나다라"
);
let url2 = decodeURIComponent(url);
const hangulOnly = url2.replace(
  /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7A3]/g,
  ""
);

console.log(hangulOnly);
const error_login = document.querySelector(".error_login");
console.log(window.location.search);
let urlParams = url.searchParams;
if (urlParams) {
  error_login.innerHTML = urlParams;
} else {
  error_login.style.height = "0px";
}
function LoginSubmit(event) {
  const username = idInput.value; //ID의 값
  const password = pwInput.value; //PW의 값
  localStorage.setItem("username", username); // 로컬 저장소에 각각 저장
  localStorage.setItem("password", password);
}

mainlogin.addEventListener("submit", LoginSubmit); // submit했을때 해당 함수 실행

pwInput.addEventListener("keyup", () => {
  pw_remove.style.visibility = "visible";
});
idInput.addEventListener("keyup", () => {
  id_remove.style.visibility = "visible";
});
// 각각의 input에 글이 써지면 X박스 보이게 함

/******************************************************* */

id_remove.addEventListener("click", () => {
  idInput.value = "";
  id_remove.style.visibility = "hidden";
});

pw_remove.addEventListener("click", () => {
  pwInput.value = "";
  pw_remove.style.visibility = "hidden";
});
// x박스를 클릭하면 input에 있는 글 지우는 함수
// + 글이 지워지면 x박스는 다시 안보이게 됨
