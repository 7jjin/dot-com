const wait_Zone = document.querySelector(".wait tbody");
const details = document.querySelector(".details");
const X = document.querySelector(".X-image");
const BlackBtn = document.querySelector(".BlackBtn");

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
        let waitingName = data[i].name;
        let waitingNum = data[i].phone_number;
        let waitingSize = data[i].party_size;
        let waitingQue = data[i].queueNumber;
        let waitings = document.createElement("tr");
        waitings.className = "TRtable";

        let WaiterName = document.querySelector('.WaiterName');
        let NumText = document.querySelector('.NumText');
        let CountNum = document.querySelector('.CountNumText');
        let PeopleText = document.querySelector('.PepleNumText');

        waitings.innerHTML = `
            <tr class="TRtable">
              <td class="NumberTD">${i + 1} 번</td>
              <td class="NameTD">${waitingName}</td>
              <td class="MenTD">${waitingSize} 명</td>
              <td class="VisitTD">${waitingQue} 번</td>
              <td class="PhoneTD">${waitingNum}</td>
            </tr>`;
        wait_Zone.append(waitings);

        let Selects = document.querySelectorAll('.TRtable td');
        Selects.forEach(function (Select) {
            Select.addEventListener("click", function () {
                WaiterName.textContent = Select.parentNode.querySelector('.NameTD').textContent;
                NumText.textContent = Select.parentNode.querySelector('.PhoneTD').textContent;
                CountNum.textContent = Select.parentNode.querySelector('.VisitTD').textContent;
                PeopleText.textContent = Select.parentNode.querySelector('.MenTD').textContent;
                showdetails();
            });
        });

    }
}

function showdetails() {
    if (!details.classList.contains('show')) {
        details.classList.add('show');
    }
}

X.addEventListener("click", () => {
    details.classList.remove("show");
});
