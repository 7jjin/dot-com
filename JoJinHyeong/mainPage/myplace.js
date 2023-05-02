const nowplace = document.querySelector(".nowplace");
const place = document.querySelector(".place");
const find = document.querySelector(".find");
const Store_Zone = document.querySelector(".Store_Zone");


nowplace.addEventListener("click",function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var geocoder = new kakao.maps.services.Geocoder();        
        var callback = function(result,status){
            if(status === kakao.maps.services.Status.OK){
                var location = result[0].address_name;
                nowplace.style.display = "none";
                var div = document.createElement("div");
                div.setAttribute("class","localname");
                var txt = document.createTextNode(`현재 위치는 ${location} 입니다.`);
                div.appendChild(txt);
                place.prepend(div);
            }
        };
        geocoder.coord2RegionCode(position.coords.longitude,position.coords.latitude,callback);
    });
});
let latitude=0;
let longitude=0;

find.addEventListener("click",function(){
  navigator.geolocation.getCurrentPosition(function(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  fetch("http://localhost:4000/place",{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    latitude:latitude,
    longitude:longitude,
  }),
  })
  .then(res=>{
      return res.json();
  })
  .then(data=>{
      findStore(data);
  })
  .catch(error=>{
      console.log(error);
  });
    })
  })


  


// fetch("http://localhost:4000/local")
// .then(res=>{
//     return res.json();
// })
// .then(data=>{
//     findStore(data);
// })
// .catch(error=>{
//     console.log(error);
// });


function findStore(data){
    find.addEventListener("click",function(){
        Store_Zone.innerHTML="";
        for(let i=0;i<data.length;i++){
            let adminCafe = data[i].adminCafe;
            let intro = data[i].storeIntroduce;
            let addr = data[i].addressName;
            let adminNo = data[i].adminNo;
            let stores = document.createElement("div");
            stores.setAttribute("class","store");
            //stores.setAttribute("value",i+1);
            stores.innerHTML = `<div class="Sign">
              <div class="Store_Sign">
                <div class="Store_Image"></div>
                <div class="Store_Name">
                  <h4 class="Store_Title">"${adminCafe}"</h4>
                  <p class="detail">"${intro}"</p>
                  <div class="rating">
                    <span class="Star"></span>
                    <span class="Star_Rating">4.5</span>
                    <span class="Review_Rating">(412)</span>
                  </div>
                  <span class="tags">연어 및 각종 일식</span><br>
                  <span class="address">"${addr}"</span>
                </div>
              </div>
            </div>`;
            stores.onclick = function(event){
              //const selectedValue = stores.getAttribute("value");
              sessionStorage.setItem("selectedValue", adminNo);
              window.location.href="/JoJinHyeong/Store_info/store.html";
            };
            Store_Zone.appendChild(stores);
          }
    })
}

