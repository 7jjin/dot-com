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

// 인원수 가로 스크롤
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");
    
window.addEventListener('scroll', function(){
    bar.style.top = `${window.scrollY}px`;
    bar.style.transition = "all 0.7s ease-out";
    if(window.scrollY===0){
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
    </div>`;
  });
});
// ------ 인원
menu.forEach((item)=>{
  item.addEventListener("click",function(e){
    //console.log(e.target.firstElementChild.children[1].innerText)
    bar.innerHTML += `
    <div class="menuBox">
          <div class="menuName">${e.target.firstElementChild.firstElementChild.innerText}</div>
          <div class="menuCost">
            <div class="menuCost_left">
              <button class="delete" onclick="del()">X</button>
              <div class="cost" value="${e.target.firstElementChild.children[1].innerText}">${e.target.firstElementChild.children[1].innerText}원</div>
            </div>
            <div class="menuCost_right">
              <button class="minus" onclick="minus()">-</button>
              <div class="su">1</div>
              <button class="plus" onclick="plus()">+</button>
            </div>
          </div>`;
  },{once:true})  // once:true 한번만 클릭하게 하기
})


// 메뉴 추가하기
// -------------------------------------------------------------------------------------------------------
function plus(e){
  const result = document.querySelector(".su");
  const cost = document.querySelector(".cost");
  const realcost = cost.getAttribute("value");    // cost의 value값 고정 (19000)
  let total = parseInt(cost.innerText);   //19000원 (계속 바뀌는 값)
  let number = parseInt(result.innerText);  //수량 (계속 바뀌는 값)
  console.log(cost.innerText)
  number = parseInt(number) +1;
  total = parseInt(total)+parseInt(realcost);
  result.innerText = number;    // 클릭 할때마다 +1
  cost.innerText = `${total}원`;      // 클릭 할떄마다 +19000
}
function minus(e){
  const result = document.querySelector(".su");
  const cost = document.querySelector(".cost");
  const realcost = cost.getAttribute("value");
  let number = result.innerText;
  let total = cost.innerText;
  if(number>1){     // 수량이 1 이상일때마 작동
    number = parseInt(number) -1;
    total = parseInt(total)-parseInt(realcost);
  }
  result.innerText = number;
  cost.innerText = `${total}원`;
}
function del(e){
  const menuBox = document.querySelector(".menuBox");
  menuBox.remove();
}