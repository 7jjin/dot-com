const HomeName = document.querySelector(".HomeName");

fetch("http://localhost:4000/waitlist")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data[0].adminCafe);
    HomeName.innerHTML = data[0].adminCafe;
  })
  .catch((error) => {
    console.log(error);
  });

