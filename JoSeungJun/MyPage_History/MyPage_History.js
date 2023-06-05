const historyBox = document.querySelector(".historyBox");
const ReviewBoxes = document.querySelectorAll(".ReviewBox");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const Phone = document.querySelector(".PhoneNumText");
const Name = document.querySelector(".NameText");
const realUpload = document.querySelector(".Upload");
const PhotoContent = document.querySelector(".PhotoContent");
const PhotoText = document.querySelector(".PhotoContent p");
const PhotoImg = document.querySelector(".PhotoContent div");
const photo = document.querySelector(".Review_img");

// db의 데이터를 가져와서 가게 리스트들을 나열
fetch("http://localhost:4000/history")
  .then((res) => {
    return res.json();
  })
  .then((data1) => {
    fetch("http://localhost:4000/store")
      .then((res) => {
        return res.json();
      })
      .then((data2) => {
        fetch("http://localhost:4000/userinfo")
          .then((res) => {
            return res.json();
          })
          .then((data3) => {
            storeList(data1, data2, data3); // 두 개의 데이터를 모두 전달하여 처리
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

function storeList(data1, data2, data3) {
  const maxLength = Math.max(data1.length, data2.length);

  for (let i = 0; i < maxLength; i++) {
    let adminCafe = data1[i].adminCafe;
    let intro = data1[i].storeIntroduce;
    let addr = data1[i].addressName;
    let adminNo = data1[i].adminNo;

    let stores = document.createElement("div");

    stores.setAttribute("class", "store");

    stores.innerHTML = `<div class="Sign">
    <div class="Store_Sign">
        <div class="Store_Image"></div>
        <div class="Store_Name">
            <h4 class="Store_Title">"${adminCafe}"</h4>
            <p class="detail">"${intro}"</p>
            <div class="rating">
                <span class="Star">⭐</span>
                <span class="Star_Rating">4.5</span>
            </div>
            <span class="tags">연어 및 각종 일식</span><br>
            <span class="address">"${addr}"</span>
        </div>
    </div>
    <div class="ReviewBox">
        <p class="ReviewContent">리뷰작성</p>
    </div>
</div>`;

    stores.onclick = function (event) {
      sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
      modal.style.display = "flex";
    };
    historyBox.appendChild(stores);

    close.addEventListener("click", function () {
      closeModal(modal);
    });

    Name.textContent = data3.CustomerName;
  }
}

function change() {
  let selectFile = realUpload.files[0];
  const file = URL.createObjectURL(selectFile);

  photo.src = file;
  PhotoImg.style.display = "block";
  PhotoText.style.display = "none";
}

PhotoContent.addEventListener("click", () => realUpload.click());
realUpload.addEventListener("change", change);

// 모달창 닫기 함수
function closeModal(e) {
  e.style.display = "none";
}

// form 데이터(별점,파일,내용) 서버로 내보내기
function submitForm(event) {
  let form = document.querySelector(".reviewBox");
  let rating = form.querySelector('input[name="reviewStar"]:checked').value;
  let fileInput = form.querySelector(".Upload");
  let file = fileInput.files[0];
  let content = form.querySelector(".content").value;
  let adminNo = sessionStorage.getItem("selectedValue");

  var formData = new FormData();
  formData.append("reviewStar", rating);
  formData.append("photo", file);
  formData.append("content", content);
  formData.append("adminNo", adminNo);

  fetch("http://localhost:4000/file", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        console.log("리뷰가 성공적으로 등록되었습니다.");
      } else {
        console.log("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
      }
    })
    .catch(function (error) {
      console.log("네트워크 오류:", error);
    });
}

const form = document.querySelector(".reviewBox");
form.addEventListener("submit", submitForm);
