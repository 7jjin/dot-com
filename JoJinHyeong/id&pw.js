const mainlogin = document.querySelector(".main_login");
const idInput = document.querySelector(".main_login .id");
const pwInput = document.querySelector(".main_login .password");

function LoginSubmit(event){
    const username = idInput.value;     //ID의 값
    const password = pwInput.value;     //PW의 값
    localStorage.setItem("username",username);      // 로컬 저장소에 각각 저장
    localStorage.setItem("password",password);
}

mainlogin.addEventListener("submit",LoginSubmit);   // submit했을때 해당 함수 실행
