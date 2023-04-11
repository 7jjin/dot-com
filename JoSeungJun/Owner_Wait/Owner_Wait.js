const X = document.querySelector(".X-image");
const details = document.querySelector(".details");
const TRtables = document.querySelectorAll(".TRtable");
const NumberTDS = document.querySelectorAll(".NumberTD")
const NameTDS = document.querySelectorAll(".NameTD");
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
            WaiterName.textContent = e.textContent
            showdetails();
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".MenTD");
        clickTDS.forEach(e => {
            PepleNumText.textContent = e.textContent
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".VisitTD");
        clickTDS.forEach(e => {
            CountNumText.textContent = e.textContent
        });
    });
});
TRtables.forEach(TRtable => {
    TRtable.addEventListener('click', () => {
        const clickTDS = TRtable.querySelectorAll(".PhoneTD");
        clickTDS.forEach(e => {
            NumText.textContent = e.textContent
        });
    });
});

function showdetails()  {
    details.classList.add('show');
}

X.addEventListener("click", () => {
    details.classList.remove("show");
});
