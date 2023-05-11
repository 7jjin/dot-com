const dooicon = document.querySelector(".dooicon");
const outerRegion = document.querySelector(".outerRegion");
const regionLinks = outerRegion.querySelectorAll(".Region_doo li");
const subicon = document.querySelector(".subicon");

dooicon.addEventListener("click", function () {
  if (outerRegion.style.display === "none") {
    outerRegion.style.display = "flex";
    subicon.style.display = "none";
  } else {
    subicon.style.display = "flex";
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

// 지역 조회누르면 사용자가 선택한 지역 보여주기(글씨로)
const checkbox = document.getElementsByName("region");
const checkedRegion = document.querySelector(".doo .example");

function check() {
  let array = [];
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      array.push(checkbox[i].parentElement.innerText.trim());
    }
  }
  if (array.length > 1) {
    checkedRegion.innerHTML = `${array[0]} 외 ${array.length - 1}곳`;
    checkedRegion.style.color = "black";
  } else if (array.length === 1) {
    checkedRegion.innerHTML = array[0];
    checkedRegion.style.color = "black";
  } else {
    checkedRegion.innerHTML = "예) 경기도 수원시";
    checkedRegion.style.color = "#aaa";
    subicon.style.display = "flex";
  }
  outerRegion.style.display = "none";
}

document.querySelector(".findRegion").addEventListener("click", check);

//초기화 버튼 기능
const resetbutton = document.querySelector(".resetbutton");
function reset() {
  checkbox.forEach((item) => {
    item.checked = false;
  });
}

resetbutton.addEventListener("click", reset);
