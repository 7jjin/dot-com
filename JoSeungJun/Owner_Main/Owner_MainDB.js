fetch("http://localhost:4000/userinfo")
    .then(res => {
        return res.json();
    })
    .then(data => {
        userinfo(data);
    })
    .catch(error => {
        console.log(error);
    });

function userinfo(data) {
    let Restaurant = document.querySelector(".HomeName");

    Restaurant.innerHTML = data.adminCafe;
}