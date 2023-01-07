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
      }
      else {
        document.querySelector("#BadPass").style.display = "block";
        document.querySelector("#GoodPass").style.display = "none";
      }
    }
  }

  function validatePassword() {
    event.preventDefault();

    if (PwInput.value != ConfirmPassInput.value) {
      ConfirmPassInput.setCustomValidity("Passwords Don't Match");
    }
  }

  ConfirmPassInput.addEventListener('blur', PassCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  EmailInput.addEventListener('blur', emailCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  Join.addEventListener("submit", validatePassword);   // submit했을때 해당 함수 실행   
});

