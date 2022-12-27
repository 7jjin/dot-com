document.addEventListener("DOMContentLoaded", function() {
    
    const open = () => { //회원가입 모달창 열기
        document.querySelector(".modal").classList.remove("hidden");
    }
    
    const close = () => { //회원가입 모달창 닫기
        document.querySelector(".modal").classList.add("hidden");
    }
    
    document.querySelector(".SignUpBtn").addEventListener("click", open); //회원가입 버튼 눌렀을 때 이벤트
    document.querySelector(".joinBtn").addEventListener("click", close); //모달창에서 가입하기 버튼 눌렀을 때 이벤트
    document.querySelector(".bg").addEventListener("click", close); //모달창 배경을 눌렀을 때 닫히는 이벤트
    
});
