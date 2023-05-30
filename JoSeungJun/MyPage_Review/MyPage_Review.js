const ReviewZone = document.querySelector(".ReviewZone");
const mainBox = document.querySelector('.mainBox');
let isMouseDown = false;
let startY, scrollDown;

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
    const ReviewDB = data[i];
    const Reviewout = document.createElement("div");
    Reviewout.classList.add("ReviewOne");

      const ReviewIn = document.createElement("div");
  
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
  
      Reviewout.appendChild(ReviewIn);
    
  
    let ReviewZone = document.querySelector(".ReviewZone");
    ReviewZone.appendChild(Reviewout);
  }
}

function slider(Element) {
  document.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    scrollDown = Element.scrollDown;
    startY = e.pageY - Element.offsetDown;
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
    const x = e.pageY - Element.offsetDown;
    const walk = (x - startY) * 1;
    Element.scrollDown = scrollDown - walk;
  })
}

ReviewZone.addEventListener("mousemove", function () {
  slider(ReviewZone);
});