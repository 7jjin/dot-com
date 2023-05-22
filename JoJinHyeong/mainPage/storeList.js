const Store_Zone = document.querySelector(".Store_Zone");

// db의 데이터를 가져와서 가게 리스트들을 나열
fetch("http://localhost:4000/mainpage")
  .then((res) => {
    return res.json();
  })
  .then(data1 => {
    fetch("http://localhost:4000/store")
      .then(res => {
        return res.json();
      })
      .then(data2 => {
        storeList(data1, data2); // 두 개의 데이터를 모두 전달하여 처리
        storeList(data1);
        menuClick(data1);
      }) 
  .catch((error) => {
    console.log(error);
  });
});

function storeList(data1,data2) {
  const maxLength = Math.max(data1.length, data2.length);

  for (let i = 0; i < maxLength; i++) {
    let adminCafe = data1[i].adminCafe;
    let intro = data1[i].storeIntroduce;
    let addr = data1[i].addressName;
    let adminNo = data1[i].adminNo;
    let open = data1[i].open;
    let waitingNum = data1[i].waitingNum;
    let review = data2[i].Review.length;  

    let Openstores = document.createElement("div");
    let Closestores = document.createElement("div");
    Openstores.setAttribute("value", foodType);
    Closestores.setAttribute("value", foodType);

    Openstores.setAttribute("class", "store");
    Closestores.setAttribute("class", "store");

    //stores.setAttribute("value",i+1);
    if (open === true) {
      Openstores.innerHTML = `<div class="Sign">
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
      <div class="WaitingBox">
      <p class="WaitingNum">${waitingNum}</p>
      <p>명</p>
    </div>
    </div>`;
    } else if (open === false) {
      Closestores.innerHTML = `<div class="CloseSign">
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
      <span class="bad">
      <p>예약</p>
      <p>불가</p>
      </span>
    </div>`;
    }
    Openstores.onclick = function (event) {
      sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
      window.location.href = "/JoJinHyeong/Store_info/store.html";
    };
    Closestores.onclick = function (event) {
      sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
      window.location.href = "/JoJinHyeong/Store_info/store.html";
    };
    Store_Zone.appendChild(Openstores);
    Store_Zone.appendChild(Closestores);
  }

}

// 음식 종류에 따른 가게 리스트 출력
function menuClick(data) {
  const sortedMenu = document.querySelectorAll("#sortedMenu");
  sortedMenu.forEach((el) => {
    el.addEventListener("click", function () {
      Store_Zone.innerHTML = "";
      let menus = el.parentElement.lastElementChild.innerHTML; //한식
      data.forEach((item) => {
        if (item.foodType === menus) {
          let adminCafe = item.adminCafe;
          let intro = item.storeIntroduce;
          let addr = item.addressName;
          let adminNo = item.adminNo;
          let open = item.open;
          let waitingNum = item.waitingNum;
          let foodType = item.foodType;
          let Openstores = document.createElement("div");
          let Closestores = document.createElement("div");
          Openstores.setAttribute("value", foodType);
          Closestores.setAttribute("value", foodType);

          Openstores.setAttribute("class", "store");
          Closestores.setAttribute("class", "store");

          //stores.setAttribute("value",i+1);
          if (open === true) {
            Openstores.innerHTML = `<div class="Sign">
              <div class="Store_Sign">
                <div class="Store_Image"></div>
                <div class="Store_Name">
                  <h4 class="Store_Title">"${adminCafe}"</h4>
                  <p class="detail">"${intro}"</p>
                  <div class="rating">
                    <span class="Star">⭐</span>
                    <span class="Star_Rating">4.5</span>
                    <span class="Review_Rating">(412)</span>
                  </div>
                  <span class="tags">연어 및 각종 일식</span><br>
                  <span class="address">"${addr}"</span>
                </div>
              </div>
              <div class="WaitingBox">
              <p class="WaitingNum">${waitingNum}</p>
              <p>명</p>
            </div>
            </div>`;
          } else if (open === false) {
            Closestores.innerHTML = `<div class="CloseSign">
              <div class="Store_Sign">
                <div class="Store_Image"></div>
                <div class="Store_Name">
                  <h4 class="Store_Title">"${adminCafe}"</h4>
                  <p class="detail">"${intro}"</p>
                  <div class="rating">
                    <span class="Star">⭐</span>
                    <span class="Star_Rating">4.5</span>
                    <span class="Review_Rating">(412)</span>
                  </div>
                  <span class="tags">연어 및 각종 일식</span><br>
                  <span class="address">"${addr}"</span>
                </div>
              </div>
              <span class="bad">
              <p>예약</p>
              <p>불가</p>
              </span>
            </div>`;
          }
          Openstores.onclick = function (event) {
            sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
            window.location.href = "/JoJinHyeong/Store_info/store.html";
          };
          Closestores.onclick = function (event) {
            sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
            window.location.href = "/JoJinHyeong/Store_info/store.html";
          };
          Store_Zone.appendChild(Openstores);
          Store_Zone.appendChild(Closestores);
        }
      });
    });
  });
}
