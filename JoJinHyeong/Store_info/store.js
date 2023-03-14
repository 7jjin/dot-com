// 인원수 가로 스크롤
// ---------------------------------------------------------------------------
const slider = document.querySelector('.barlist');
let isMouseDown = false;
let startX, scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  scrollLeft = slider.scrollLeft;
  startX = e.pageX - slider.offsetLeft;
});

slider.addEventListener('mouseleave', () => {
  isMouseDown = false;
});

slider.addEventListener('mouseup', () => {
  isMouseDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

// 플로팅 버튼
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");

window.addEventListener('scroll', function(){
    bar.style.top = `${window.scrollY}px`;
    bar.style.transition = "all 0.7s ease-out";
    if(window.scrollY===0){
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
let cart =[];   // 장바구니 배열
number.forEach((item,index)=>{
  item.addEventListener("click",function(e){
    bar.style.borderRadius = "20px";
    bar.style.justifyContent= 'flex-Start';
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
    <div class="costHap"></div>`;
  });
});
// ------ 메뉴추가
menu.forEach((item,index)=>{
  item.addEventListener("click",function(e){
    
    const line = document.querySelector(".bottomline");
    const menuBoxOuter = document.querySelector(".menuBoxOuter");     // 총합DIV을 맨 아래 넣기 위해 각각의 메뉴태그들을 감싸는 부모 태그를 만들었다.
    
    menuBoxOuter.innerHTML += `
    <div class="menuBox" value="${index}">
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
    const product = {
      name:`${e.target.firstElementChild.firstElementChild.innerText}`,
      quantity: 1,
      price: `${e.target.firstElementChild.children[1].innerText}`
    };
    // 새로 추가될때마다 총합 태그는 가장 아래 위치됨
    cart.push(product);
    hap();
    line.style.visibility = "visible";
    const costhap = document.querySelector(".costHap");
    costhap.style.display="flex";       // 합계 DIV 보이게 하기
    costhap.innerHTML = `
    <div class="hapDiv">
      <div class="hapname">합계: </div>
      <div class="hap">아직몰라</div>
      <div>원</div>
    </div>
    `
    
  },{once:true})  // once:true 한번만 클릭하게 하기
  
})

    


// 인원 추가하기
// -------------------------------------------------------------------------------------------------------

function plus(el){
  let uni = el.parentNode.parentNode.parentNode.getAttribute("value");
  const result = el.parentNode.parentNode.childNodes[3].childNodes[3];  //총 인원태그
  let cost = el.parentNode.parentNode.firstElementChild.childNodes[3];  //총 가격태그
  let total = el.parentNode.parentNode.firstElementChild.childNodes[3].innerText;  //총 가격
  let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
  const realcost = el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute("value"); //메뉴 하나당 가격(불변)
  number = parseInt(number)+1;
  total = parseInt(total)+parseInt(realcost);
  result.innerText = number;
  cost.innerText = `${total}`;
  cart[uni].price = total;          // 변화된 가격을 각각의 요소에 맞는 객체를 찾아서 바꿔준다.
  hap();

}



function minus(el){
  let uni = el.parentNode.parentNode.parentNode.getAttribute("value");
  const result = el.parentNode.parentNode.childNodes[3].childNodes[3];  //총 인원태그
  let cost = el.parentNode.parentNode.firstElementChild.childNodes[3];  //총 가격태그
  let total = el.parentNode.parentNode.firstElementChild.childNodes[3].innerText;  //총 가격
  let number = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText; //총 수
  const realcost = el.parentNode.parentNode.firstElementChild.childNodes[3].getAttribute("value"); //메뉴 하나당 가격(불변)
  if(number>1){     // 수량이 1 이상일때마 작동
    number = parseInt(number) -1;
    total = parseInt(total)-parseInt(realcost);
  }
  result.innerText = number;
  cost.innerText = `${total}`;
  cart[uni].price = total;
  hap();
  console.log(cart)

}

function del(el){         //박스 삭제
  let uni = el.parentNode.parentNode.parentNode.getAttribute("value");
  const menuBox = document.querySelector(".menuBox");
  menuBox.remove();
  cart.splice(uni,1);
  hap();
  console.log(cart)
}

// 총 가격 구하는 함수
//---------------------------------------------------------------------------------------------

function hap(){
    var hapcost = 0;
    for(let i=0;i<cart.length;i++){
      hapcost +=Number(cart[i].price);
    }
    console.log(hapcost)
}




// 버튼 누르면 해당 이벤트 적용
// --------------------------------------------------------------------------------------------
const Filter = document.querySelector('.filter');
const Blank = document.querySelector('.blank');
const HomeTab = document.querySelector('.homeTab');
const MenuTab = document.querySelector('.MenuTab');
const PhotoTab = document.querySelector('.photoTab');
const ReviewTab = document.querySelector('.userReviewTab');
const Home = document.querySelector('.store_Home');
const Home_Top = window.pageYOffset + Home.getBoundingClientRect().top;
const Menu = document.querySelector('.store_Menu');
const Menu_Top = window.pageYOffset + Menu.getBoundingClientRect().top;
const Photo = document.querySelector('.storePhoto');
const Photo_Top = window.pageYOffset + Photo.getBoundingClientRect().top;
const Review = document.querySelector('.storeReview');
const Review_Top = window.pageYOffset + Review.getBoundingClientRect().top;

function Top(){

  if(window.scrollY > 625){
    Filter.style.position = "fixed";
    Filter.style.top = "0";
    Filter.style.boxShadow = "0px 0px 0px 0px";
  }
  else if(window.scrollY < 625){
    Filter.style.position = "";
    Filter.style.top = "";
    Filter.style.boxShadow = "0px 0px 0px 0px #ddd";
  }
}

function Move(element){
  window.scroll({top : element - 100, behavior: 'smooth'});
}

HomeTab.addEventListener('click', function(){
  Move(Home_Top);
});
MenuTab.addEventListener('click', function(){
  Move(Menu_Top);
});
PhotoTab.addEventListener('click', function(){
  Move(Photo_Top);
});
ReviewTab.addEventListener('click', function(){
  Move(Review_Top);
});

window.addEventListener('scroll', () => { 
  Top();
});
