const nameStore = document.querySelector(".name");
const storeIntro = document.querySelector(".storeIntro");
const addr = document.querySelector(".AddressInfo");
const Menu2 = document.querySelector(".Menu");
const menuName1 = document.querySelector(".MenuName1");
const menuName2 = document.querySelector(".MenuName2");
const menuPrice1 = document.querySelector(".MenuPrice1");
const menuPrice2 = document.querySelector(".MenuPrice2");
const call = document.querySelector(".CallInfo");
const week = document.querySelector(".Week");
const openTime = document.querySelector(".OpenTime");
const closeTime = document.querySelector(".CloseTime");
const modal = document.querySelector(".modal");
const CostNum = document.querySelector(".CostNum");
const NameText = document.querySelector(".NameText");
const OrderText = document.querySelector(".OrderText");
const PhoneText = document.querySelector(".PhoneText");
const NumText = document.querySelector(".NumText");
const modalbtn = document.querySelector(".modal-foot");
const peopleBox = document.querySelector(".people");
const ReviewZone = document.querySelector(".ReviewZone");
const PhotoNum = document.querySelector(".PhotoNum");
const ReviewCount = document.querySelector(".ReviewCount");

const uni = sessionStorage.getItem("selectedValue");
const url = `http://localhost:4000/store?adminNo=${uni}`;
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    openingDay(data);
    renderPage(data);
    addr.innerHTML = `${data[0].addressName}`;
    call.innerHTML = `${data[0].storePhone}`;
    openTime.innerHTML = `${data[0].openingTime}`;
    closeTime.innerHTML = `${data[0].closingTime}`;
    nameStore.innerHTML = `${data[0].adminCafe}`;
    storeIntro.innerHTML = `${data[0].storeIntroduce}`;
    //예약 불가능 한 가게 예약 막는 곳//
    if (data[0].open === 0) {
      peopleBox.innerHTML = `<div class="ClosingBox">
      <span class="ClosingText"> 예약이 불가능 한 가게입니다.</span>
      </div>`
    }
    /*-----------------------------------------------------------*/
  })
  .catch((err) => console.log(err));

fetch("http://localhost:4000/Review")
  .then(res => {
    return res.json();
  })
  .then(data => {
    ReviewBoxes(data);
  })
  .catch(error => {
    console.log(error);
  });

function renderPage(data) {
  for (let i = 0; i < data[0].categories.length; i++) {
    // 카테고리별로 박스 만들어서 appendChild로 추가
    const menubox = document.createElement("div");
    menubox.innerHTML = `<a class="MenuItem">
        <h1 class="Menu${i + 1}">${data[0].categories[i].categoryName}</h1>
        </a>`;
    Menu2.appendChild(menubox);

    for (let j = 0; j < data[0].categories[i].menuList.length; j++) {
      // ------ 메뉴추가
      const menu = data[0].categories[i].menuList[j];
      const menulist = document.createElement("div");
      menulist.innerHTML = `<a class="SubItem">
      <div class="MenuInfo">
      <div class="MenuName">
        <h4>
          <strong class="MenuName1">${menu.menuName}</strong>
        </h4>
      </div>
      <span class="MenuPrice1">${menu.menuPrice}</span>
      <span>원</span>
    </div>
    <div class="menuImg" style="background-image: url(${menu.menusavedNm})"></div>
    </a>`;
      Menu2.appendChild(menulist);

      // ------ 탭 클릭 이동 이벤트

      PhotoTab.addEventListener("click", function () {
        Move1(
          window.pageYOffset +
          document.querySelector(".storePhoto").getBoundingClientRect().top
        );
      });
      ReviewTab.addEventListener("click", function () {
        Move1(
          window.pageYOffset +
          document.querySelector(".storeReview").getBoundingClientRect().top
        );
      });

      // ------ 메뉴추가
      const menu3 = document.querySelectorAll(".SubItem");

      menu3.forEach((item) => {
        item.addEventListener("click", function (e) {
          const line = document.querySelector(".bottomline");
          const menuBoxOuter = document.querySelector(".menuBoxOuter"); // 총합DIV을 맨 아래 넣기 위해 각각의 메뉴태그들을 감싸는 부모 태그를 만들었다.
          if (
            cart.every(
              (menu3) =>
                menu3.name !== item.childNodes[1].childNodes[1].innerText
            )
          ) {
            menuBoxOuter.innerHTML += `
                <div class="menuBox">
                      <div class="menuName">${item.childNodes[1].childNodes[1].innerText}</div>
                      <div class="menuCost">
                        <div class="menuCost_left">
                          <button class="delete" onclick="del(this)">X</button>
                          <div class="cost" value="${item.childNodes[1].childNodes[3].innerText}">${item.childNodes[1].childNodes[3].innerText}</div>
                          <div>원</div>
                        </div>
                        <div class="menuCost_right">
                          <button class="minus" onclick="minus(this)">-</button>
                          <div class="su">1</div>
                          <button class="plus" onclick="plus(this)">+</button>
                        </div>
                </div>`;
            const product = {
              name: `${item.childNodes[1].childNodes[1].innerText}`,
              quantity: 1,
              price: Number(item.childNodes[1].childNodes[3].innerText),
            };
            // 새로 추가될때마다 총합 태그는 가장 아래 위치됨
            cart.push(product);

            line.style.visibility = "visible";
            const costhap = document.querySelector(".costHap");
            const count = document.querySelector(".count");
            costhap.style.display = "flex"; // 합계 DIV 보이게 하기
            count.style.display = "block";
            costhap.innerHTML = `
                <div class="hapDiv">
                  <div class="hapname">합계: </div>
                  <div class="hap"></div>
                  <div>원</div>
                </div>
                `
            count.innerHTML = `
                <button class="order">주문하기</button>`

            //모달창
            let orderBTN = document.querySelector(".order");
            let close = document.querySelector(".close");

            orderBTN.addEventListener("click", function (event) {
              event.preventDefault();
              modal.style.display = "flex";
            });
            close.addEventListener("click", function (event) {
              modal.style.display = "none";
            });

            hap();
          }
        });
      });
    }
    const bar = document.createElement("hr");
    bar.className = "line";
    Menu2.append(bar);

    NameText.innerHTML = data[0].adminCafe;

    //예약하기 버튼 눌렀을 때 데이터 sent()함수
    function handleClick1() {
      sent();
    }

    modalbtn.onclick = function () {
      handleClick1();
    };
  }
}

// ------ 리뷰추가
function ReviewBoxes(data) {


  for (let i = 0; i < data.length; i++) {
    ReviewCount.textContent = data.length;
    const ReviewDB = data[i];
    const Reviewbox = document.createElement("div");
    Reviewbox.innerHTML = `<div class="ReviewOne">
    <div class="UserZone">
      <span class="UserProfile" style="background-image: url(${ReviewDB.ReviewProfile}")></span>
      <h4 class="NickName">${ReviewDB.ReviewID}</h4>
    </div>
    <li class="Review">
      <div class="ReviewPhoto" style="background-image: url(${ReviewDB.ReviewImg})"></div>
      <div class="ReviewContent">${ReviewDB.ReviewContent}</div>
    </li>
    <div class="DateInfo">
      <span class="UserCount">2번째 방문</span>
      <span class="UserDate">${ReviewDB.ReviewDate}</span>
    </div>
  </div>`;
    ReviewZone.appendChild(Reviewbox);

    let photoItem = document.createElement("li");
    let image = document.createElement("img");
    photoItem.className = "Photo";
    image.src = data[i].ReviewImg;
    photoItem.appendChild(image);
    PhotoNum.appendChild(photoItem);

    var photos = document.querySelectorAll('.Photo');
    for (let i = 0; i < photos.length; i++) {
      photos[i].addEventListener('click', function () {
        var src = this.src.replace('data[i].ReviewImg', 'big'); // 대표 이미지에서 원본 이미지 경로 추출
        var alt = this.alt; // 대표 이미지 alt 속성 값 추출
        openModal(src, alt); // 모달창 열기 함수 호출
      });
    }

    modal.addEventListener('click', function() {
      closeModal(); // 모달창 닫기 함수 호출
    });
  }
}

function Move1(element) {
  window.scroll({ top: element - 95, behavior: "smooth" });
}

// 운영요일 구하는 함수
function openingDay(data) {
  const day = String(data[0].weekday);
  let daylist = "";
  for (let i = 0; i < day.length; i++) {
    if (day[i] === "0") daylist += "일 ";
    else if (day[i] === "1") daylist += "월 ";
    else if (day[i] === "2") daylist += "화 ";
    else if (day[i] === "3") daylist += "수 ";
    else if (day[i] === "4") daylist += "목 ";
    else if (day[i] === "5") daylist += "금 ";
    else if (day[i] === "6") daylist += "토 ";
  }
  week.innerHTML = daylist;
}

function openModal(src, alt) {
  modal.style.display = 'block'; // 모달창 열기
  modalImg.src = src; // 모달창 이미지 변경
  captionText.innerHTML = alt; // 모달창 캡션 변경
}

// 모달창 닫기 함수
function closeModal() {
  modal.style.display = 'none';
}
