const wait_Zone = document.querySelector(".wait");

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

        wait_Zone.innerHTML = `<div class="Sign">
        <div class="Store_Sign">
          <div class="Store_Image"></div>
          <div class="Store_Name">
            <h4 class="Store_Title">"${adminCafe}"</h4>
            <p class="detail">"${intro}"</p>
            <div class="rating">
              <span class="Star">⭐</span>
              <span class="Star_Rating">4.5</span>
              <span class="Review_Rating">(412)</span>
            </div>
            <span class="tags">연어 및 각종 일식</span><br>
            <span class="address">"${addr}"</span>
          </div>
        </div>
      </div>`;
    }
}