const dooicon = document.querySelector(".dooicon");
const outerRegion = document.querySelector(".outerRegion");
const regionLinks = outerRegion.querySelectorAll(".Region_doo li");
dooicon.addEventListener("click", function () {
  if (outerRegion.style.display === "none") {
    outerRegion.style.display = "flex";
  } else {
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
