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
    let review = data2[i].Review.length;

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
                <span class="Review_Rating">(${review})</span>
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

const content = document.querySelector(".content");
const modalFoot = document.querySelector(".modal-foot");
const reviewDom = document.querySelectorAll("fieldset input");
reviewDom.forEach((item) => {
  item.addEventListener("click", function () {
    rating = item.value;

    modalFoot.addEventListener("click", function () {
      console.log(content.value);
      let formData = new FormData();
      formData.append("file", document.querySelector(".reviewBox")[0].files[0]);
      formData.append("rating", item.value);
      formData.append("content", content.value);
      formData.append("adminNo", sessionStorage.getItem("selectedValue"));

      fetch("API", {
        method: "post",
        headers: {},
        body: formData,
      })
        .then((res) => res.json)
        .catch((err) => console.log(err));
    });
  });
});
