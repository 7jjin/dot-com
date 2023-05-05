const password = document.querySelector(".phone_input input");
const submit = document.querySelector(".phone_submit");

function Inputpassword(target) {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/(\-{1,2})$/g, "");
}
function submitpassword() {
  const len = password.value.length;
  const phone = password.value;
  if (len === 13) {
    fetch(" http://localhost:4000/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // location.href = "/JoJinHyeong/mainPage/main.html";
        document.querySelector(".socialLogin_phone").style.display = "none";
      })
      .catch((err) => console.log(err));
  } else {
    alert("전화번호를 다시 입력해주세요!");
  }
}

fetch("http://localhost:4000/login")
  .then((res) => res.json())
  .then((data) => {
    if (data[0].provider === "kakao") {
      document.querySelector(".socialLogin_phone").style.display = "block";
    }
  })
  .catch((err) => console.log(err));
