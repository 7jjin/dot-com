const Store_Zone = document.querySelector(".Store_Zone");

// db의 데이터를 가져와서 가게 리스트들을 나열
fetch("http://localhost:4000/mainpage")
  .then(res => {
    return res.json();
  })
  .then(data => {
    storeList(data);
  })
  .catch(error => {
    console.log(error);
  });

function storeList(data) {
  for (let i = 0; i < data.length; i++) {
    let adminCafe = data[i].adminCafe;
    let intro = data[i].storeIntroduce;
    let addr = data[i].addressName;
    let adminNo = data[i].adminNo;
    let open = data[i].open;
    let waitingNum = data[i].waitingNum
    let Openstores = document.createElement("div");
    let Closestores = document.createElement("div");

    Openstores.setAttribute("class", "store");
    Closestores.setAttribute("class", "store");

    //stores.setAttribute("value",i+1);
    if (open === 1) {
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
    }
    else if (open === 0) {
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
    </div>`;
    }
    Openstores.onclick = function (event) {
      sessionStorage.setItem("selectedValue", adminNo);   //sessionStorage에 가게고유의 adminNo값 저장
      window.location.href = "/JoJinHyeong/Store_info/store.html";
    };
    Store_Zone.appendChild(Openstores);
    Store_Zone.appendChild(Closestores);

  }
}


