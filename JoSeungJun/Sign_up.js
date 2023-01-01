document.addEventListener("DOMContentLoaded", function () {
  const open = () => { //회원가입 모달창 열기
    document.querySelector(".modal").classList.remove("hidden");
  }

  const close = () => { //회원가입 모달창 닫기
    document.querySelector(".modal").classList.add("hidden");
  }

  const Comb = document.querySelector(".Combine");
  const Join = document.querySelector(".join");
  const IdPw = document.querySelector(".IdPw");
  const IdInput = document.querySelector(".IdPw .IdInput");
  const PwInput = document.querySelector(".IdPw #PassInput");
  const ConfirmPassInput = document.querySelector(".IdPw #ConfirmPassInput");
  const NameInputs = document.querySelector(".join .NameInput");
  const DateBirthInput = document.querySelector(".join .DateBirthInput");
  const PhoneInput = document.querySelector(".join .PhoneInput");
  const EmailInput = document.querySelector(".join .EmailInput");
  const errorbox = document.querySelector("#email_errorbox");

  function IdPwSubmit(event) {
    const ID = IdInput.value;     //ID의 값
    const Pass = PwInput.value;     //PW의 값
    const ConfirmPass = ConfirmPassInput.value;     //비밀번호 확인의 값
    localStorage.setItem("아이디", ID);      // 로컬 저장소에 각각 저장
    localStorage.setItem("비밀번호", Pass);
    localStorage.setItem("비밀번호 확인", ConfirmPass);
  }

  function JoinSubmit(event) {
    const Name = NameInputs.value;     //이름의 값
    const DateBirth = DateBirthInput.value;     //생년월일의 값
    const Phone = PhoneInput.value;     //핸드폰 번호의 값
    const Email = EmailInput.value;     //이메일의 값
    localStorage.setItem("이름", Name);
    localStorage.setItem("생년월일", DateBirth);
    localStorage.setItem("핸드폰 번호", Phone);
    localStorage.setItem("이메일", Email);
  }

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

  ConfirmPassInput.addEventListener('blur', PassCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  EmailInput.addEventListener('blur', emailCheck);  //email의 형식이 틀릴경우 오류 문자 생성
  IdPw.addEventListener("submit", IdPwSubmit);   // submit했을때 해당 함수 실행   
  Join.addEventListener("submit", JoinSubmit);   // submit했을때 해당 함수 실행   
  document.querySelector(".SignUpBtn").addEventListener("click", open); //회원가입 버튼 눌렀을 때 이벤트
  document.querySelector(".bg").addEventListener("click", close); //모달창 배경을 눌렀을 때 닫히는 이벤트
});

