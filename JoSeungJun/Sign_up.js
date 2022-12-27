document.addEventListener("DOMContentLoaded", function() {
    // document.addEventListener('keydown', function(event) { //엔터키가 적용이 안되게 막는 이벤트
    //     if (event.keyCode === 13) {
    //       event.preventDefault();
    //     };
    //   }, true);
    function IDsubmit(e){
      e.addEventListener("submit",function(){
        let userInfo = this.children[0].value;
        localStorage.setItem('ID',userInfo);
      });
    }
    function PASSsubmit(e){
      e.addEventListener("submit",function(){
        let userInfo = this.children[0].value;
        localStorage.setItem('PASS',userInfo);
      });
    }
    
    const open = () => { //회원가입 모달창 열기
        document.querySelector(".modal").classList.remove("hidden");
    }
    
    const close = () => { //회원가입 모달창 닫기
        document.querySelector(".modal").classList.add("hidden");
    }
    
    const ID = document.querySelector("#Id");
    const PASS = document.querySelector("#Pass");
    const ConfirmPASS = document.querySelector("#ConfirmPass");
    const NAME = document.querySelector("#Name");
    const DATE = document.querySelector("#DateBirth");
    const PHONE = document.querySelector("#Phone");

    document.querySelector(".joinBtn").addEventListener("click",function(){
      IDsubmit(ID);
    });

    IDsubmit(ID);

    document.querySelector(".SignUpBtn").addEventListener("click", open); //회원가입 버튼 눌렀을 때 이벤트
    document.querySelector(".joinBtn").addEventListener("click", close); //모달창에서 가입하기 버튼 눌렀을 때 이벤트
    document.querySelector(".bg").addEventListener("click", close); //모달창 배경을 눌렀을 때 닫히는 이벤트
});
