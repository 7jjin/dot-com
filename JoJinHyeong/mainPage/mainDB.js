fetch("http://localhost:4000/waitingBar")
    .then(res => {
        return res.json();
    })
    .then(data => {
        waitingBar(data);
    })
    .catch(error => {
        console.log(error);
    });

fetch("http://localhost:4000/userinfo")
    .then(res => {
        return res.json();
    })
    .then(data => {
        Users(data);
    })
    .catch(error => {
        console.log(error);
    });

function waitingBar(data) {
    let PartyBox = document.querySelector(".memberChange");
    let Name = document.querySelector(".RestaurantName p");
    let Num = document.querySelector(".Num");
    let Phone = document.querySelector(".call")

    Name.innerHTML = data[0].adminCafe;
    Num.innerHTML = data[0].queueNumber;

    PartyBox.addEventListener('mouseenter',function() {
        this.innerHTML = data[0].partySize;
    });
    PartyBox.addEventListener('mouseleave', function() {
        this.innerHTML = '';
    });

    Phone.addEventListener('mouseenter',function() {
        this.innerHTML = data[0].storePhone
    });
    Phone.addEventListener('mouseleave', function() {
        this.innerHTML = '';
    });
}

function Users(data) {
    let UserName = document.querySelector(".utilList_User");

    UserName.innerHTML = data.CustomerName;
}