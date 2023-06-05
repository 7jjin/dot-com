const wait_Zone = document.querySelector(".wait tbody");
const details = document.querySelector(".details");
const X = document.querySelector(".X-image");
const BlackBtn = document.querySelector(".BlackBtn");
const lockBtn = document.querySelector(".lockBtn");
const unlockBtn = document.querySelector(".unlockBtn");
const ReserveBtn = document.querySelector(".ReserveBtn");
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

  //adminNo,userNo에 데이터를 보낸는 함수
  function sendData(adminNo, userNo) {
    fetch("http://localhost:4000/waiting", {
      method: "POST",
      body: JSON.stringify({ adminNo, userNo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("데이터 전송 성공");
          location.reload();
        } else {
          console.log("데이터 전송 실패");
        }
      })
      .catch((error) => {
        console.log("데이터 전송 중 오류 발생:", error);
      });
  }
  
function waitingList(data) {
  for (let i = 0; i < data.length; i++) {
    let waitingName = data[i].name;
    let waitingNum = data[i].phone_number;
    let waitingSize = data[i].party_size;
    let waitingQue = data[i].queueNumber;
    let blacklist = data[i].blacklisted;
    let userNo = data[i].userNo;
    let adminNo = data[i].adminNo;
    let waitings = document.createElement("tr");
    if (blacklist === true) {
      waitings.className = "TRtable black";
    } else {
      waitings.className = "TRtable";
    }

    waitings.dataset.userNo = userNo;
    waitings.dataset.adminNo = adminNo;

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
    if (blacklist === true) {
      for (let i = 0; i < waitingsChildren.length; i++) {
        waitingsChildren[i].style.color = "red";
      }
    }

    waitings.addEventListener("click", function () {
      WaiterName.textContent = this.querySelector('.NameTD').textContent;
      NameText.textContent = this.querySelector('.NameTD').textContent;
      NumText.textContent = this.querySelector('.PhoneTD').textContent;
      PhoneNumText.textContent = this.querySelector('.PhoneTD').textContent;
      CountNum.textContent = this.querySelector('.VisitTD').textContent;
      PeopleText.textContent = this.querySelector('.MenTD').textContent;

      if (this.classList.contains('black')) {
        lockBtn.style.display = "block";
        unlockBtn.style.display = "none";
        BlackPeople.style.display = "block";
      } else {
        lockBtn.style.display = "none";
        unlockBtn.style.display = "block";
        BlackPeople.style.display = "none";
      }

      lockBtn.addEventListener("click", function () {
        console.log(adminNo, userNo)
        sendData(adminNo, userNo);
      });
      ReserveBtn.addEventListener("click", function () {
        console.log(adminNo, userNo)
        sendData(adminNo, userNo);
      });

      showdetails();
    });
  }
}

function showdetails() {
  if (!details.classList.contains("show")) {
    details.classList.add("show");
  }
}

// 모달창 닫기 함수
function closeModal(e) {
  e.style.display = 'none';
}

X.addEventListener("click", () => {
  details.classList.remove("show");
});

unlockBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  closeModal(modal)
});

