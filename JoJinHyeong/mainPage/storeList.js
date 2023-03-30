
const Store_Zone = document.querySelector(".Store_Zone");

// db의 데이터를 가져와서 가게 리스트들을 나열
fetch("http://localhost:4000/mainpage")
.then(res=>{
    return res.json();
})
.then(data=>{
    storeList(data);
})
.catch(err=>{
    console.log(err);
});


//각각의 가게들을 만드는 함수
function storeList(data){
    for(let i=0;i<data.length;i++){
        let adminCafe = data[i].adminCafe;
        let intro = data[i].storeIntroduce; 
        let addr = data[i].addressName;
        let stores = document.createElement("div");
        stores.setAttribute("class","store");
        stores.setAttribute("value",i+1);
        stores.innerHTML = `<div class="Sign" onclick=location.href="/JoJinHyeong/Store_info/store.html">
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
      Store_Zone.appendChild(stores);
    }
}

const store = document.querySelectorAll(".store");
store.forEach((item)=>{
    console.log(item)
})


