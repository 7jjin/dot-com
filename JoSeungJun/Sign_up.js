document.addEventListener("DOMContentLoaded", function() {
    // document.addEventListener('keydown', function(event) { //엔터키가 적용이 안되게 막는 이벤트
    //     if (event.keyCode === 13) {
    //       event.preventDefault();
    //     };
    //   }, true);
    const open = () => { //회원가입 모달창 열기
        document.querySelector(".modal").classList.remove("hidden");
    }
    
    const close = () => { //회원가입 모달창 닫기
        document.querySelector(".modal").classList.add("hidden");
    }
    
    document.querySelector(".SignUpBtn").addEventListener("click", open); //회원가입 버튼 눌렀을 때 이벤트
    document.querySelector(".bg").addEventListener("click", close); //모달창 배경을 눌렀을 때 닫히는 이벤트

    const Join = document.querySelector(".join");
    const IdInput = document.querySelector(".join .IdInput");
    const PwInput = document.querySelector(".join .PassInput");
    const ConfirmPassInput = document.querySelector(".join .ConfirmPassInput");
    const NameInput = document.querySelector(".join .NameInput");
    const DateBirthInput = document.querySelector(".join .DateBirthInput");
    const PhoneInput = document.querySelector(".join .PhoneInput");

    function JoinSubmit(event){
      const ID = IdInput.value;     //ID의 값
      const Pass = PwInput.value;     //PW의 값
      const ConfirmPass = ConfirmPassInput.value;     //비밀번호 확인의 값
      const Name = NameInput.value;     //이름의 값
      const DateBirth = DateBirthInput.value;     //생년월일의 값
      const Phone = PhoneInput.value;     //핸드폰 번호의 값
      localStorage.setItem("아이디",ID);      // 로컬 저장소에 각각 저장
      localStorage.setItem("비밀번호",Pass);
      localStorage.setItem("비밀번호 확인",ConfirmPass);
      localStorage.setItem("이름",Name);      
      localStorage.setItem("생년월일",DateBirth);      
      localStorage.setItem("핸드폰 번호",Phone);
   }

   function Confirm(){
    if(Pass != ConfirmPass){
      alert("비밀번호가 일치하지 않습니다");
      return false;
    }
    else {
      alert("비밀번호가 일치합니다");
      document.querySelector(".TruePass").style.display = "block";
      return true;
    }
  }
   
  Confirm();

   Join.addEventListener("submit",JoinSubmit);   // submit했을때 해당 함수 실행
});
