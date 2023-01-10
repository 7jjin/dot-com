document.addEventListener("DOMContentLoaded", function () {

  const Join = document.querySelector(".join");
  const PwInput = document.querySelector("#PassInput");
  const ConfirmPassInput = document.querySelector("#ConfirmPassInput");
  const EmailInput = document.querySelector(".EmailInput");
  const errorbox = document.querySelector("#email_errorbox");

  function emailCheck() {
    var Email = EmailInput.value;
    var re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (re.test(Email) === false) {
      errorbox.style.visibility = "visible";
    } else {
      errorbox.style.visibility = "hidden";
    }
    if (Email === '') {
      errorbox.style.visibility = "hidden";
    }
  }

  function PassCheck() {
    if (document.getElementById('PassInput').value != '' && document.getElementById('ConfirmPassInput').value != '') {
      if (document.getElementById('PassInput').value == document.getElementById('ConfirmPassInput').value) {
        document.querySelector("#GoodPass").style.display = "block";
        document.querySelector("#BadPass").style.display = "none";
        document.querySelector(".joinBtn").disabled = false;
      }
      else {
        document.querySelector("#BadPass").style.display = "block";
        document.querySelector("#GoodPass").style.display = "none";
        document.querySelector(".joinBtn").disabled = true;
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

  ConfirmPassInput.addEventListener('blur', PassCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  EmailInput.addEventListener('blur', emailCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  Join.addEventListener("submit", validatePassword);   // submit했을때 해당 함수 실행   
});

