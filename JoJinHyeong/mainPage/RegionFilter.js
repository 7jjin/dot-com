const dooicon = document.querySelector(".dooicon");
const outerRegion = document.querySelector(".outerRegion");
const regionLinks = outerRegion.querySelectorAll(".Region_doo li");
const subicon = document.querySelector(".subicon");
const MediaQuery = matchMedia("screen and (max-width: 1024px)").mathch;
dooicon.addEventListener("click", function () {
  if (outerRegion.style.display === "none") {
    outerRegion.style.display = "flex";
    subicon.style.display = "none";
  } else {
    if (MediaQuery) {
      subicon.style.display = "inline";
    } else {
      subicon.style.display = "none";
    }
    outerRegion.style.display = "none";
  }
});

// 기본 지역 선택은 서울로 초기화
const seoullist = outerRegion.querySelector(".Region_si ul[data-region=seoul]");
const allLiElements = outerRegion.querySelectorAll(".Region_si li");
allLiElements.forEach(function (li) {
  if (li.parentElement === seoullist) {
    // 서울지역만 나오게 하기
    li.style.display = "block";
  } else {
    li.style.display = "none"; // 나머지는 안보이게 하기
  }
});

//각각의 지역을 클릭했을 때 해당 지역 도시 나오게 하기
regionLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const region = this.dataset.region;
    const regionLists = outerRegion.querySelectorAll(
      `.Region_si ul[data-region="${region}"]`
    ); // data-region 속성 값이 해당 지역 이름으로 시작하는 ul 요소들

    // 클릭됬을때 나머지는 지우고 해당 지역의 li만 보이게 하기
    allLiElements.forEach(function (li) {
      li.style.display = "none";
    });
    regionLists.forEach(function (list) {
      const liElements = list.querySelectorAll("li");
      liElements.forEach(function (li) {
        li.style.display = "block";
      });
    });
  });
});

// 지역 선택하면 색 바뀌게 하는 함수
function handleClick(event) {
  regionLinks.forEach((e) => {
    e.classList.remove("doo_color");
  });
  event.target.closest("li").classList.add("doo_color");
}

regionLinks.forEach((e) => {
  if (e.dataset.region === "seoul") {
    e.classList.add("doo_color");
  }
  e.addEventListener("click", handleClick);
});

// 지역 조회누르면 사용자가 선택한 지역 보여주기
const checkbox = document.getElementsByName("region");
const checkedRegion = document.querySelector(".doo .example");

// 선택한 지역의 가게 리스트 보여주기
function check() {
  let array = []; // 선택된 지역들
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      array.push(checkbox[i].parentElement.innerText.trim());
    }
  }
  fetch("http://localhost:4000/mainpage")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (array.length > 1) {
        // 지역 선택을 한 곳 이상했을 경우
        checkedRegion.innerHTML = `${array[0]} 외 ${array.length - 1}곳`;
        checkedRegion.style.color = "black";
        Store_Zone.innerHTML = "";

        data.forEach((item) => {
          if (array.includes(item.addressName.split(" ")[1])) {
            let adminCafe = item.adminCafe;
            let intro = item.storeIntroduce;
            let addr = item.addressName;
            let adminNo = item.adminNo;
            let open = item.open;
            let waitingNum = item.waitingNum;
            let foodType = item.foodType;
            let review = item.review_length;

            let Openstores = document.createElement("div");
            let Closestores = document.createElement("div");
            Openstores.setAttribute("value", foodType);
            Closestores.setAttribute("value", foodType);
            Openstores.setAttribute("class", "store");
            Closestores.setAttribute("class", "store");
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
            Store_Zone.appendChild(Openstores);
            Store_Zone.appendChild(Closestores);
          }
        });
        menuClick_Mul(data, array);
      } else if (array.length === 1) {
        // 지역 선택을 한 곳만 했을 경우
        checkedRegion.innerHTML = array[0];
        checkedRegion.style.color = "black";
        Store_Zone.innerHTML = "";
        data.forEach((item) => {
          if (item.addressName.split(" ")[1] === array[0]) {
            let adminCafe = item.adminCafe;
            let intro = item.storeIntroduce;
            let addr = item.addressName;
            let adminNo = item.adminNo;
            let open = item.open;
            let waitingNum = item.waitingNum;
            let foodType = item.foodType;
            let review = item.review_length;

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
          </div>`;
            }
            Openstores.onclick = function (event) {
              sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
              window.location.href = "/JoJinHyeong/Store_info/store.html";
            };
            Store_Zone.appendChild(Openstores);
            Store_Zone.appendChild(Closestores);
          }
        });
        menuClick_sol(data, array);
      } else {
        // 지역 선택을 안했을 경우
        if (MediaQuery) {
          subicon.style.display = "inline";
        } else {
          subicon.style.display = "none";
        }
        checkedRegion.innerHTML = "예) 경기도 수원시";
        checkedRegion.style.color = "#aaa";
        Store_Zone.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          let adminCafe = data[i].adminCafe;
          let intro = data[i].storeIntroduce;
          let addr = data[i].addressName;
          let adminNo = data[i].adminNo;
          let open = data[i].open;
          let waitingNum = data[i].waitingNum;
          let foodType = data[i].foodType;
          let review = data[i].review_length;

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
          </div>`;
          }
          Openstores.onclick = function (event) {
            sessionStorage.setItem("selectedValue", adminNo); //sessionStorage에 가게고유의 adminNo값 저장
            window.location.href = "/JoJinHyeong/Store_info/store.html";
          };
          Store_Zone.appendChild(Openstores);
          Store_Zone.appendChild(Closestores);
        }
        menuClick(data);
      }
      outerRegion.style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
}
document.querySelector(".findRegion").addEventListener("click", check);

function menuClick_Mul(data, array) {
  const sortedMenu = document.querySelectorAll("#sortedMenu");
  sortedMenu.forEach((el) => {
    el.addEventListener("click", function () {
      Store_Zone.innerHTML = "";
      let menus = el.parentElement.lastElementChild.innerHTML; //한식
      data.forEach((item) => {
        if (
          item.foodType === menus &&
          array.includes(item.addressName.split(" ")[1])
        ) {
          let adminCafe = item.adminCafe;
          let intro = item.storeIntroduce;
          let addr = item.addressName;
          let adminNo = item.adminNo;
          let open = item.open;
          let waitingNum = item.waitingNum;
          let foodType = item.foodType;
          let review = item.review_length;

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
      });
    });
  });
}
function menuClick_sol(data, array) {
  const sortedMenu = document.querySelectorAll("#sortedMenu");
  sortedMenu.forEach((el) => {
    el.addEventListener("click", function () {
      Store_Zone.innerHTML = "";
      let menus = el.parentElement.lastElementChild.innerHTML; //한식
      data.forEach((item) => {
        if (
          item.foodType === menus &&
          item.addressName.split(" ")[1] === array[0]
        ) {
          let adminCafe = item.adminCafe;
          let intro = item.storeIntroduce;
          let addr = item.addressName;
          let adminNo = item.adminNo;
          let open = item.open;
          let waitingNum = item.waitingNum;
          let foodType = item.foodType;
          let review = item.review_length;

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
      });
    });
  });
}
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
          let review = item.review_length;

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
      });
    });
  });
}

//초기화 버튼 기능
const resetbutton = document.querySelector(".resetbutton");
function reset() {
  checkbox.forEach((item) => {
    item.checked = false;
  });
}
resetbutton.addEventListener("click", reset);
