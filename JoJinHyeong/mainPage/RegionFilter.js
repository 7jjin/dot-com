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

regionLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const region = this.dataset.region;
    const regionLists = outerRegion.querySelectorAll(
      `.Region_si ul[data-region="${region}"]`
    ); // data-region 속성 값이 해당 지역 이름으로 시작하는 ul 요소들

    // 모든 지역에 대한 li 요소를 숨김
    const allLiElements = outerRegion.querySelectorAll(".Region_si li");
    allLiElements.forEach(function (li) {
      li.style.display = "none";
    });
    // 해당 지역에 대한 li 요소를 보임
    regionLists.forEach(function (list) {
      const liElements = list.querySelectorAll("li");
      liElements.forEach(function (li) {
        li.style.display = "block";
      });
    });
  });
});
