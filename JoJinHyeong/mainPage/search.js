let dataList = [];

// 모든 가게 이름 데이터 추가
fetch("http://localhost:4000/mainpage")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      dataList.push(data[i].adminCafe);
    }
  })
  .catch((error) => {
    console.log(error);
  });

console.log(dataList);

const search = document.querySelector(".search");
const autoComplete = document.querySelector(".autocomplete");
let nowIndex = 0;
console.log(search);
search.addEventListener("keyup", function (event) {
  console.log("a");
  const value = search.value.trim();
  const matchDataList = value
    ? dataList.filter((label) => label.includes(value))
    : [];

  switch (event.keyCode) {
    // UP KEY
    case 38:
      nowIndex = Math.max(nowIndex - 1, 0);
      break;

    // DOWN KEY
    case 40:
      nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
      break;

    // ENTER KEY
    case 13:
      document.querySelector("#search").value = matchDataList[nowIndex] || "";
      // 초기화
      nowIndex = 0;
      matchDataList.length = 0;
      break;

    // 그외 다시 초기화
    default:
      nowIndex = 0;
      break;
  }

  // 리스트 보여주기
  show_seartchList(matchDataList, value, nowIndex);
});

const show_seartchList = (data, value, nowIndex) => {
  // 정규식으로 변환
  const regex = new RegExp(`(${value})`, "g");

  autoComplete.innerHTML = data
    .map(
      (label, index) => `
        <div class='${nowIndex === index ? "active" : ""}'>
          ${label.replace(regex, "<mark>$1</mark>")}
        </div>
      `
    )
    .join("");
};
