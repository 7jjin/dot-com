const Btn = document.querySelector(".ConfirmBtn");
const Pass = document.querySelector(".Pass");
const New = document.querySelector(".NewPass");
const Confirm = document.querySelector(".ConfirmPass")

function alarm() {
    alert("비밀번호가 수정되었습니다.");
}

function validatePassword() {
    if((New.value === "") | (New.value === "") | (Confirm.value === "")){
        alert("비밀번호를 입력해주세요.");
        event.preventDefault();
    }
    else if (New.value != Confirm.value) {
        alert("비밀번호가 일치하지 않습니다.");
        event.preventDefault();
    }
    else if (Pass.value === New.value) {
        alert("기존 비밀번호와 일치합니다.");
        event.preventDefault();
    }
    else if ((New.value === Confirm.value) & (Pass.value != New.value)) {
        event.preventDefault();
        alert("비밀번호가 변경되었습니다.")
        window.location.href = '/JoSeungJun/MyPage_Account/MyPage_Account.html'
    }
}

Btn.addEventListener("click", validatePassword)
