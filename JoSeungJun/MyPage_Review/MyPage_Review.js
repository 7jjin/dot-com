const ReviewZone = document.querySelector(".ReviewZone");
const mainBox = document.querySelector('.mainBox');
let isMouseDown = false;
let startX, scrollLeft;

const url = `http://localhost:4000/Review`;
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then(data => {
    ReviewBoxes(data);
  })
  .catch((error) => {
    console.log(error);
  });

function ReviewBoxes(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      const ReviewDB = data[i];
      const Reviewout = document.createElement("div");
      const ReviewIn = document.createElement("div");

      Reviewout.innerHTML = `<div class="ReviewOne">
      </div>`;

      ReviewIn.innerHTML = `
        <div class="UserZone">
          <h4 class="NickName">${ReviewDB.adminCafe}</h4>
        </div>
        <li class="Review">
          <div class="ReviewPhoto" style="background-image: url(${ReviewDB.ReviewImg})"></div>
          <div class="ReviewContent">${ReviewDB.ReviewContent}</div>
        </li>
        <div class="DateInfo">
          <span class="UserCount">2번째 방문</span>
          <span class="UserDate">${ReviewDB.ReviewDate}</span>
        </div>`;
      let ReviewOne = document.querySelector(".ReviewOne");

      ReviewOne.appendChild(ReviewIn)
      ReviewZone.appendChild(Reviewout);
    }
  }
}

function slider(Element) {
  document.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    scrollLeft = Element.scrollLeft;
    startX = e.pageX - Element.offsetLeft;
  });

  document.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - Element.offsetLeft;
    const walk = (x - startX) * 1;
    Element.scrollLeft = scrollLeft - walk;
  })
}

mainBox.addEventListener("mousemove", function () {
  slider(mainBox);
});