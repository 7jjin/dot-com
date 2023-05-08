fetch("http://localhost:4000/userinfo")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    userinfo(data);
  })
  .catch((error) => {
    console.log(error);
  });

function userinfo(data) {
  let Restaurant = document.querySelector(".HomeName");

  Restaurant.innerHTML = data.adminCafe;
}

fetch("http://localhost:4000/mainpage")
  .then((res) => {
    return res.json();
  })
  .then((jsonData) => {
    data = jsonData;
    open_res(data);
  })
  .catch((error) => {
    console.log(error);
  });

function updateData(data) {
  fetch("http://localhost:4000/mainpage", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("업데이트 완료:", data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function open_res(data) {
  const obj = data[0]; // 첫 번째 객체 선택

  if (obj.open === false) {
    Btn.addEventListener("click", () => {
      obj.open = true;
      updateData(data); // JSON 데이터 업데이트
    });
  } else if (obj.open === true) {
    Btn.addEventListener("click", () => {
      obj.open = false;
      updateData(data); // JSON 데이터 업데이트
    });
  }

  if (obj.open === false) {
    ON.style.display = "none";
    OFF.style.display = "block";
  } else if (obj.open === true) {
    ON.style.display = "block";
    OFF.style.display = "none";
  }
}
