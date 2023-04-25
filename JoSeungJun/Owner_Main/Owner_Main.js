const Btn = document.querySelector('.Left');
const ON = document.querySelector('.OnText');
const OFF = document.querySelector('.OffText');


Btn.addEventListener("click", () => {
    if (OFF.style.display === "block") {
        ON.style.display = "block";
        OFF.style.display = "none";
    }
    else if (OFF.style.display === "none") {
        ON.style.display = "none";
        OFF.style.display = "block";
    }
})


