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
    
    const Join = document.querySelector(".join");
    const IdPw = document.querySelector(".IdPw");
    const IdInput = document.querySelector(".IdPw .IdInput");
    const PwInput = document.querySelector(".IdPw .PassInput");
    const ConfirmPassInput = document.querySelector(".IdPw .ConfirmPassInput");
    const NameInputs = document.querySelector(".join .NameInput");
    const DateBirthInput = document.querySelector(".join .DateBirthInput");
    const PhoneInput = document.querySelector(".join .PhoneInput");
    const EmailInput = document.querySelector(".join .EmailInput");

    function Confirm(e,ele){ //비밀번호와 비밀번호 확인이 일치하는지 검사하는 구문
      if(e === ele){
        document.querySelector(".TruePass").style.display = "block";
        event.preventDefault();  
        return true;
      }
      else {
        alert("비밀번호가 일치하지 않습니다.");
        event.preventDefault();
        localStorage.clear();
        return false;
      }
    };

    // function ReduId(e,ele){ //로컬스토리지에 아이디와 중복되는지 검사하는 구문
    //   if(e === ele){
    //     alert("아이디가 중복됩니다");
    //     event.preventDefault();  
    //     return true;
    //   }
    // };

    function IdPwSubmit(event){
      const ID = IdInput.value;     //ID의 값
      const Pass = PwInput.value;     //PW의 값
      const ConfirmPass = ConfirmPassInput.value;     //비밀번호 확인의 값
      localStorage.setItem("아이디",ID);      // 로컬 저장소에 각각 저장
      localStorage.setItem("비밀번호",Pass);
      localStorage.setItem("비밀번호 확인",ConfirmPass);
      Confirm(Pass,ConfirmPass);
     }

    function JoinSubmit(event){
    const Name = NameInputs.value;     //이름의 값
    const DateBirth = DateBirthInput.value;     //생년월일의 값
    const Phone = PhoneInput.value;     //핸드폰 번호의 값
    const Email = EmailInput.value;     //이메일의 값
    localStorage.setItem("이름",Name);      
    localStorage.setItem("생년월일",DateBirth);      
    localStorage.setItem("핸드폰 번호",Phone);
    localStorage.setItem("이메일",Email);
   }


  IdPw.addEventListener("submit",IdPwSubmit);   // submit했을때 해당 함수 실행   
  Join.addEventListener("submit",JoinSubmit);   // submit했을때 해당 함수 실행   
  document.querySelector(".SignUpBtn").addEventListener("click", open); //회원가입 버튼 눌렀을 때 이벤트
  document.querySelector(".bg").addEventListener("click", close); //모달창 배경을 눌렀을 때 닫히는 이벤트
});
