const wait_Zone = document.querySelector(".wait tbody");
const details = document.querySelector(".details");
const X = document.querySelector(".X-image");
const BlackBtn = document.querySelector(".BlackBtn");
const lockBtn = document.querySelector(".lockBtn");
const unlockBtn = document.querySelector(".unlockBtn");
const BlackPeople = document.querySelector(".BlackPeople");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const NameText = document.querySelector(".NameText");
const PhoneNumText = document.querySelector(".PhoneNumText");

fetch("http://localhost:4000/waiting")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    waitingList(data);
  })
  .catch((error) => {
    console.log(error);
  });

function waitingList(data) {
  for (let i = 0; i < data.length; i++) {
    let waitingName = data[i].name;
    let waitingNum = data[i].phone_number;
    let waitingSize = data[i].party_size;
    let waitingQue = data[i].queueNumber;
    let blacklist = data[i].black;
    let waitings = document.createElement("tr");
    if (data[i].black === 1) {
      waitings.className = "TRtable black";
    } else {
      waitings.className = "TRtable";
    }

    let WaiterName = document.querySelector(".WaiterName");
    let NumText = document.querySelector(".NumText");
    let CountNum = document.querySelector(".CountNumText");
    let PeopleText = document.querySelector(".PepleNumText");

    waitings.innerHTML = `
            <tr class="TRtable">
              <td class="NumberTD">${i + 1} 번</td>
              <td class="NameTD">${waitingName}</td>
              <td class="MenTD">${waitingSize} 명</td>
              <td class="VisitTD">${waitingQue} 번</td>
              <td class="PhoneTD">${waitingNum}</td>
            </tr>`;
    wait_Zone.append(waitings);

    let waitingsChildren = waitings.children;
    if (blacklist === 1) {
      for (let i = 0; i < waitingsChildren.length; i++) {
        waitingsChildren[i].style.color = "red";
      }
    }

    let Selects = document.querySelectorAll('.TRtable td');
    Selects.forEach(function (Select) {
      Select.addEventListener("click", function () {
        WaiterName.textContent = Select.parentNode.querySelector('.NameTD').textContent;
        NameText.textContent = Select.parentNode.querySelector('.NameTD').textContent;
        NumText.textContent = Select.parentNode.querySelector('.PhoneTD').textContent;
        PhoneNumText.textContent = Select.parentNode.querySelector('.PhoneTD').textContent;
        CountNum.textContent = Select.parentNode.querySelector('.VisitTD').textContent;
        PeopleText.textContent = Select.parentNode.querySelector('.MenTD').textContent;

        if (Select.parentNode.classList.contains('black')) {
          lockBtn.style.display = "block";
          unlockBtn.style.display = "none";
          BlackPeople.style.display = "block"
        } else {
          lockBtn.style.display = "none";
          unlockBtn.style.display = "block";
          BlackPeople.style.display = "none";
        }

        showdetails();
      });
    });
    unlockBtn.addEventListener("click", function () {
      modal.style.display = "flex";
    });
    closeBtn.addEventListener("click", function () {
      closeModal(modal)
    });
  }
}

function showdetails() {
  if (!details.classList.contains("show")) {
    details.classList.add("show");
  }
}

X.addEventListener("click", () => {
  details.classList.remove("show");
});


// 모달창 닫기 함수
function closeModal(e) {
  e.style.display = 'none';
}

