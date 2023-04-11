const Bar_slider = document.querySelector('.barlist');
const Photo_slider = document.querySelector('.PhotoList');
// 인원수 가로 스크롤
// ---------------------------------------------------------------------------
let isMouseDown = false;
let startX, scrollLeft;

function slider(Element) {
  Element.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    scrollLeft = Element.scrollLeft;
    startX = e.pageX - Element.offsetLeft;
  });

  Element.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });

  Element.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  Element.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - Element.offsetLeft;
    const walk = (x - startX) * 1;
    Element.scrollLeft = scrollLeft - walk;
  });
}

// 플로팅 버튼
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");

window.addEventListener('scroll', function () {
  bar.style.top = `${window.scrollY}px`;
  bar.style.transition = "all 0.7s ease-out";
  if (window.scrollY === 0) {
    bar.style.top = '100px';
  }
});

// 가로 스크롤 - 버튼 누르면 해당 버튼의 색이 변하고 다른 버튼을 누르면 해제되는 함수
// ----------------------------------------------------------------------------
function change_btn(e) {
  var btns = document.querySelectorAll(".number span");
  btns.forEach(function (btn) {
    if (e.currentTarget == btn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// 인원을 고르면 플로팅 바의 모양이 바뀜
//--------------------------------------------------------------------------------
const number = document.querySelectorAll(".number span");
const menu = document.querySelectorAll(".SubItem");
let cart = [];   // 장바구니 배열
  
    number.forEach((item, index) => {
      item.addEventListener("click", function (e) {
        bar.style.borderRadius = "20px";
        bar.style.justifyContent = 'flex-Start';
        bar.style.marginLeft = ""
        bar.style.width = "220px";
        bar.style.right = "-35%";
        bar.style.flexDirection = "column";
        bar.style.height = "none"
        bar.style.alignItems = "normal";
        bar.innerHTML = `<div class="member">
    <p>인원: ${e.target.innerText}</p>
    </div>
    <div class="bottomline"></div>
    <div class="menuBoxOuter"></div>
    <div class="costHap"></div>
    <div class="count" onclick="sent()"</div>`;
      });
    });


    // ------ 메뉴추가
    menu.forEach((item) => {
      item.addEventListener("click", function (e) {
        const line = document.querySelector(".bottomline");
        const menuBoxOuter = document.querySelector(".menuBoxOuter");     // 총합DIV을 맨 아래 넣기 위해 각각의 메뉴태그들을 감싸는 부모 태그를 만들었다.
        if (cart.every((menu) => menu.name !== item.childNodes[1].childNodes[1].innerText)) {
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
            price: Number(item.childNodes[1].childNodes[3].innerText)
          };
          // 새로 추가될때마다 총합 태그는 가장 아래 위치됨
          cart.push(product);

          line.style.visibility = "visible";
          const costhap = document.querySelector(".costHap");
          const count = document.querySelector(".count");
          costhap.style.display = "flex";       // 합계 DIV 보이게 하기
          count.style.display = "block";
          costhap.innerHTML = `
      <div class="hapDiv">
        <div class="hapname">합계: </div>
        <div class="hap"></div>
        <div>원</div>
      </div>
      `
          count.innerHTML = `
      <button>주문하기</button>`
          hap();
        }
      });
    })




    // 인원 추가하기
    // -------------------------------------------------------------------------------------------------------

    function plus(el) {
      let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
      const result = el.parentNode.parentNode.childNodes[3].childNodes[3];  //총 인원태그
      let cost = el.parentNode.parentNode.firstElementChild.childNodes[3];  //총 가격태그
      let total = el.parentNode.parentNode.firstElementChild.childNodes[3].innerText;  //총 가격
      let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
      const realcost = el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute("value"); //메뉴 하나당 가격(불변)
      number = parseInt(number) + 1;
      total = parseInt(total) + parseInt(realcost);
      result.innerText = number;
      cost.innerText = `${total}`;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === uni) {
          cart[i].price = total;    // 변화된 가격을 각각의 요소에 맞는 객체를 찾아서 바꿔준다.
          cart[i].quantity = number;
        }
      }
      hap();
    }

    function minus(el) {
      let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
      const result = el.parentNode.parentNode.childNodes[3].childNodes[3];  //총 인원태그
      let cost = el.parentNode.parentNode.firstElementChild.childNodes[3];  //총 가격태그
      let total = el.parentNode.parentNode.firstElementChild.childNodes[3].innerText;  //총 가격
      let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
      const realcost = el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute("value"); //메뉴 하나당 가격(불변)
      if (number > 1) {     // 수량이 1 이상일때마 작동
        number = parseInt(number) - 1;
        total = parseInt(total) - parseInt(realcost);
      }
      result.innerText = number;
      cost.innerText = `${total}`;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === uni) {
          cart[i].price = total;
          cart[i].quantity = number;
        }
      }

      hap();

    }

    function del(el) {         //박스 삭제
      let uni = el.parentNode.parentNode.parentNode.childNodes[1].innerText;
      let menuBox = el.parentNode.parentNode.parentNode;
      menuBox.remove();
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === uni) {
          cart.splice(i, 1)
        }
      }

      hap();
    }

    // 총 가격 구하는 함수
    //---------------------------------------------------------------------------------------------

    function hap() {
      var hapcost = 0;
      const hapdiv = document.querySelector(".hap");
      for (let i = 0; i < cart.length; i++) {
        hapcost += Number(cart[i].price);
      }
      hapdiv.innerText = hapcost;
    }

    //데이터(인원,메뉴) 내보내는 함수
    //--------------------------------------------------------------------------------------------
    function sent() {
      fetch("http://localhost:4000/list",{
        method:"post",
        body:JSON.stringify(cart),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then((response)=>{
        if(!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((json) =>{
        console.log("성공",json);
      })
      .catch((error)=>{
        console.log("실패",error);
      })
    }
    // json-server --watch db.json  가상서버 실행




    // 버튼 누르면 해당 이벤트 적용
    // --------------------------------------------------------------------------------------------

    const Filter = document.querySelector('.filter');
    const Blank = document.querySelector('.blank');
    const HomeTab = document.querySelector('.homeTab');
    const MenuTab = document.querySelector('.MenuTab');
    const PhotoTab = document.querySelector('.photoTab');
    const ReviewTab = document.querySelector('.userReviewTab');
    const Photos = document.querySelector('.Photo');
    const Home = document.querySelector('.store_Home');
    const Home_Top = window.pageYOffset + Home.getBoundingClientRect().top;
    const Menu = document.querySelector('.store_Menu');
    const Menu_Top = window.pageYOffset + Menu.getBoundingClientRect().top;
    const Photo = document.querySelector('.storePhoto');
    const Photo_Top = window.pageYOffset + Photo.getBoundingClientRect().top;
    const Review = document.querySelector('.storeReview');
    const Review_Top = window.pageYOffset + Review.getBoundingClientRect().top;
    const ReviewMore = document.querySelector('.ReviewMore');
    const ReviewMore1 = document.querySelector('.ReviewMore1');
    const ReviewBox = document.querySelector('.ReviewBox');
    const PhotoMore = document.querySelector('.PhotoMore');
    const PhotoBox = document.querySelector('.PhotoBox');
    const Right = document.querySelector('.Right');
    const Left = document.querySelector('.Left');
    const PhotoReduce = document.querySelector('.PhotoReduce');
    const ReviewReduce = document.querySelector('.ReviewReduce');

    function Top() {
      if (window.scrollY > 625) {
        Filter.style.position = "fixed";
        Filter.style.top = "0";
      }
      else if (window.scrollY < 625) {
        Filter.style.position = "";
        Filter.style.top = "";
      }
    }

    function Move(element) {
      window.scroll({ top: element - 60, behavior: 'smooth' });
    }
    function Expansion(Element) {
      var addHeight = 1000;
      var currentHeight = Element.clientHeight;
      var newHeight = currentHeight + addHeight;

      Element.style.height = newHeight + "px";
    }

    HomeTab.addEventListener('click', function () {
      Move(Home_Top);
    });
    MenuTab.addEventListener('click', function () {
      Move(Menu_Top);
    });
    PhotoTab.addEventListener('click', function () {
      Move(Photo_Top);
    });
    ReviewTab.addEventListener('click', function () {
      Move(Review_Top);
    });

    Bar_slider.addEventListener('mousemove', function () {
      slider(Bar_slider);
    });
    Photo_slider.addEventListener('mousemove', function () {
      slider(Photo_slider);
    });

    window.addEventListener('scroll', () => {
      Top();
    });

    PhotoMore.addEventListener('click', () => {
      PhotoBox.style.height = "1000px";
      PhotoMore.style.display = "none";
      PhotoReduce.style.display = "block";
      Right.style.visibility = "hidden";
      Left.style.visibility = "hidden";
    });
    ReviewMore.addEventListener('click', () => {
      PhotoBox.style.height = "1000px";
      ReviewMore.style.display = "none";
      ReviewReduce.style.display = "block";
    });

    PhotoReduce.addEventListener('click', () => {
      PhotoBox.style.height = "200px";
      PhotoMore.style.display = "block";
      PhotoReduce.style.display = "none";
    });
    ReviewReduce.addEventListener('click', () => {
      ReviewBox.style.height = "600px";
      ReviewMore.style.display = "block";
      ReviewReduce.style.display = "none";
    });

    ReviewMore1.addEventListener('click', () => {
      Expansion(ReviewBox);
      ReviewMore.style.display = "none";
      ReviewReduce.style.display = "block";
    });
