document.addEventListener("DOMContentLoaded", function () {

  const Join = document.querySelector(".join");
  const PwInput = document.querySelector("#PassInput");
  const ConfirmPassInput = document.querySelector("#ConfirmPassInput");
  const PassInput = document.querySelector("#PassInput");
  const EmailInput = document.querySelector(".EmailInput");
  const errorbox = document.querySelector("#email_errorbox");
  const Good = document.querySelector("#GoodPass");
  const Bad = document.querySelector("#BadPass");
  const JoinBtn = document.querySelector(".joinBtn");
  const NotBtn = document.querySelector(".NotBtn");


  function Check() {
    var Email = EmailInput.value;
    var Pass = PassInput.value;
    var Confirm = ConfirmPassInput.value;
    var re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (re.test(Email) === false) { //이메일 양식 확인
      errorbox.style.visibility = "visible";
    } else {
      errorbox.style.visibility = "hidden";
    }
    if (Email === '') {
      errorbox.style.visibility = "hidden";
    }

    if (Pass != '' && Confirm != '') { //비밀번호확인
      if (Pass == Confirm) {
        Good.style.display = "block";
        Bad.style.display = "none";
      }
      else {
        Good.style.display = "none";
        Bad.style.display = "block";    
      }
    }

    if (Pass != '' && Confirm != '') { //비밀번호가 일치하고 이메일 양식이 맞으면 회원가입 버튼 활성화
      if ((Pass == Confirm) && (re.test(Email) === true)) {
        JoinBtn.style.display = "block"
        NotBtn.style.display = "none"
      }
      else{
        JoinBtn.style.display = "none"
        NotBtn.style.display = "block"
      }
    }
  }

  function validatePassword(){
    event.preventDefault();

    if(PwInput.value != ConfirmPassInput.value) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      ConfirmPassInput.setCustomValidity(''); // 오류가 없으면 메시지를 빈 문자열로 설정해야한다. 오류 메시지가 비어 있지 않은 한 양식은 유효성 검사를 통과하지 않고 제출되지 않는다.
    }
  }

  ConfirmPassInput.addEventListener('blur', Check);  //email의 형식이 틀릴경우 오류 문자 생성
  PassInput.addEventListener('blur', Check);  //email의 형식이 틀릴경우 오류 문자 생성
  EmailInput.addEventListener('blur', Check);  //email의 형식이 틀릴경우 오류 문자 생성
  Join.addEventListener("submit", validatePassword);   // submit했을때 해당 함수 실행   
});