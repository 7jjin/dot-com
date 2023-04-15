const waitingZone = document.querySelector(".wait");
const wait_Zone = document.querySelector(".wait tbody");
const details = document.querySelector(".details");

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
        let Selects = document.querySelectorAll('.TRtable');
        let WaiterName = document.querySelector('.WaiterName');
        let NumText = document.querySelector('.NumText');
        waitings.className = "TRtable";

        waitings.innerHTML = `<tr class = "TRtable" name = "${i}">
        <td class="NumberTD">${i+1} 번</td>
        <td class="NameTD">${waitingName}</td>
        <td class="MenTD">2 명</td>
        <td class="VisitTD">4 번</td>
        <td class="PhoneTD">${waitingNum}</td>
        </tr>`;
        wait_Zone.append(waitings);

        Selects.forEach(function(Select) {
            Select.addEventListener("click",function() {     
                WaiterName.textContent = Select.children[1].textContent;
                NumText.textContent = Select.children[4].textContent;
                showdetails();
            });
        });
    }  
 
}

function showdetails()  {
    details.classList.add('show');
}