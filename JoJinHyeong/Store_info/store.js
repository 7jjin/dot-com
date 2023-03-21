const Bar_slider = document.querySelector('.barlist');
const Photo_slider = document.querySelector('.PhotoList');
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

// 인원수 가로 스크롤
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");

window.addEventListener('scroll', function () {
  bar.style.top = `${window.scrollY}px`;
  bar.style.transition = "all 0.7s ease-out";
  if (window.scrollY === 0) {
    bar.style.top = '100px';
  }
});
// 플로팅 버튼
// ---------------------------------------------------------------------------

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
// 가로 스크롤 - 버튼 누르면 해당 버튼의 색이 변하고 다른 버튼을 누르면 해제되는 함수
// ----------------------------------------------------------------------------
const number = document.querySelectorAll(".number span");
const menu = document.querySelectorAll(".SubItem");

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
    <div class="bottomline"></div>`;
  });
});
// ------ 인원추가
menu.forEach((item) => {
  item.addEventListener("click", function (e) {
    const line = document.querySelector(".bottomline");
    line.style.visibility = "visible";
    bar.innerHTML += `
    <div class="menuBox">
          <div class="menuName">${e.target.firstElementChild.firstElementChild.innerText}</div>
          <div class="menuCost">
            <div class="menuCost_left">
              <button class="delete" onclick="del(this)">X</button>
              <div class="cost" value="${e.target.firstElementChild.children[1].innerText}">${e.target.firstElementChild.children[1].innerText}</div>
              <div>원</div>
            </div>
            <div class="menuCost_right">
              <button class="minus" onclick="minus(this)">-</button>
              <div class="su">1</div>
              <button class="plus" onclick="plus(this)">+</button>
            </div>
          </div>`;

  }, { once: true })  // once:true 한번만 클릭하게 하기
})




// 메뉴 추가하기
// -------------------------------------------------------------------------------------------------------

function plus(el) {
  const result = el.parentNode.parentNode.childNodes[3].childNodes[3];  //총 인원태그
  let cost = el.parentNode.parentNode.firstElementChild.childNodes[3];  //총 가격태그
  let total = el.parentNode.parentNode.firstElementChild.childNodes[3].innerText;  //총 가격
  let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
  const realcost = el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute("value"); //메뉴 하나당 가격(불변)
  number = parseInt(number) + 1;
  total = parseInt(total) + parseInt(realcost);
  result.innerText = number;
  cost.innerText = `${total}`;
}

function minus(el) {
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
}

function del(el) {         //박스 삭제
  const menuBox = document.querySelector(".menuBox");
  menuBox.remove();
}

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
function Expansion(Element){
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



