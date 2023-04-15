const X = document.querySelector(".X-image");
const details = document.querySelector(".details");
const TRtables = document.querySelectorAll(".TRtable");
const NameTDS = document.querySelectorAll(".NameTD");
const NumberTDS = document.querySelectorAll(".NumberTD")
const MenTDS = document.querySelectorAll(".MenTD");
const VisitTDS = document.querySelectorAll(".VisitTD");
const PhoneTDS = document.querySelectorAll(".PhoneTD");
const WaiterName = document.querySelector(".WaiterName");
const NumText = document.querySelector(".NumText");
const CountNumText = document.querySelector(".CountNumText");
const PepleNumText = document.querySelector(".PepleNumText");

TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".NameTD");
        clickTDS.forEach(e => {
            showdetails();
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".MenTD");
        clickTDS.forEach(e => {
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".VisitTD");
        clickTDS.forEach(e => {
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".PhoneTD");
        clickTDS.forEach(e => {
        });
    });
});

function showdetails()  {
    details.classList.add('show');
}

X.addEventListener("click", () => {
    details.classList.remove("show");
});
