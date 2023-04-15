const wait_Zone = document.querySelector(".wait");
const waiting = document.querySelector(".wait tbody");

fetch("http://localhost:4000/waiting")
    .then(res => {
        return res.json();
    })
    .then(data => {
        waitingList(data);
    })
    .catch(error => {
        console.log(error);
    });

function waitingList(data) {
    for (let i = 0; i < data.length; i++) {
        let waitingName = data[i].adminCafe;
        let waitingNum = data[i].storePhone;

        waiting.innerHTML = `<tr class = "TRtable" name = "${i}">
        <td class="NumberTD">${i+1} 번</td>
        <td class="NameTD">${waitingName}</td>
        <td class="MenTD">2 명</td>
        <td class="VisitTD">4 번</td>
        <td class="PhoneTD">${waitingNum}</td>
        </tr>`;
    }
}