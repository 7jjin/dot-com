const mainlogin = document.querySelector(".main_login");
const idInput = document.querySelector(".main_login .id");
const pwInput = document.querySelector(".main_login .password");
const id_remove = document.querySelector("#id_remove");
const pw_remove = document.querySelector("#pw_remove");


function LoginSubmit(event){
    const username = idInput.value;     //ID의 값
    const password = pwInput.value;     //PW의 값
    localStorage.setItem("username",username);      // 로컬 저장소에 각각 저장
    localStorage.setItem("password",password);
}

mainlogin.addEventListener("submit",LoginSubmit);// submit했을때 해당 함수 실행


pwInput.addEventListener('keyup',()=>{
    pw_remove.style.visibility = "visible";
});
idInput.addEventListener('keyup',()=>{
    id_remove.style.visibility = "visible";
});
// 각각의 input에 글이 써지면 X박스 보이게 함

/******************************************************* */

id_remove.addEventListener("click",()=>{
    idInput.value = "";
    id_remove.style.visibility = "hidden";
})

pw_remove.addEventListener("click",()=>{
    pwInput.value = "";
    pw_remove.style.visibility = "hidden";

})
// x박스를 클릭하면 input에 있는 글 지우는 함수
// + 글이 지워지면 x박스는 다시 안보이게 됨