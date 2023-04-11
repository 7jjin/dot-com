const waitingZone = document.querySelector(".wait");
const wait_Zone = document.querySelector(".wait tbody")
const TRtables = document.querySelectorAll(".TRtable");
const NameTDS = document.querySelectorAll(".NameTD");

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
        let waitings = document.createElement("tr");

        waitings.innerHTML = `<tr class = "TRtable" name = "${i+1}">
        <td class="NumberTD">${i+1} 번</td>
        <td class="NameTD">${waitingName}</td>
        <td class="MenTD">2 명</td>
        <td class="VisitTD">4 번</td>
        <td class="PhoneTD">${waitingNum}</td>
        </tr>`;

        wait_Zone.append(waitings);

        TRtables.forEach(TRtable => {
            TRtable.addEventListener('click', () => {
                const clickTDS = TRtable.querySelectorAll(".NameTD");
                clickTDS.forEach(e => {
                    WaiterName.textContent = e.textContent
                    showdetails();
                });
            });
        });
    }
}

function showdetails()  {
    details.classList.add('show');
}