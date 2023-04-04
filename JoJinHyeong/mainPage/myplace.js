const nowplace = document.querySelector(".nowplace");
const place = document.querySelector(".place");
const find = document.querySelector(".find");
const store = document.querySelector(".store");


nowplace.addEventListener("click",function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var geocoder = new kakao.maps.services.Geocoder();        
        var callback = function(result,status){
            if(status === kakao.maps.services.Status.OK){
                var location = result[0].address_name;
                nowplace.style.display = "none";
                var div = document.createElement("div");
                var txt = document.createTextNode(`현재 위치는 ${location} 입니다.`);
                div.appendChild(txt);
                place.prepend(div);
                div.style.marginBottom = "30px";
                div.style.fontSize = "30px";
            }
        };
        geocoder.coord2RegionCode(position.coords.longitude,position.coords.latitude,callback);
    });
});


// find버튼 누를 시 카카오API에서 받아온 내 주변 가게들을 보여줌
// find.addEventListener("click",function(){
//     store.style.display="block";        // 찾기 버튼 누를 시 가게 정보 보이게 함
//     navigator.geolocation.getCurrentPosition(function(position){    // 현재 위치의 위도 경도 찾기
//         var places = new kakao.maps.services.Places();
//         let long = position.coords.longitude;
//         let lat = position.coords.latitude;
//         var callback = function(result, status) {   //콜벡함수 
//             if (status === kakao.maps.services.Status.OK) {     //콜벡함수 호출 성공시 
//                 result = result.sort((a,b)=>a.distance-b.distance);     // 결과를 거리를 오름차순으로 정렬
//                 console.log(result);
//                 let tempList ="";
//                 for(let i=0;i<result.length;i++){       // 가게 정보를 배열의 길이만큼 출력
//                     tempList +=                         // 변수에 html정보를 저장
//                     `
//                     <div class="store${i} base">
//                         <div class="storeName">
//                         <p>${result[i].place_name}</p>
//                         <div class="distance">${result[i].distance}M</div>
//                         </div>
//                         <p class="phone">${result[i].phone}</p>
//                         <p class="address">${result[i].road_address_name}</p>
//                         <a href=${result[i].place_url} class="placeURL">${result[i].place_url}</a>
//                     </div>`;
//                     store.innerHTML = tempList;         // 저장된 변수를 innerHTML로 HTML에 추가
//                 }
//             }
//         };
//         places.categorySearch('FD6', callback, {
//             // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
//             location: new kakao.maps.LatLng(lat,long)
//         });
//     });
// });


fetch("http://localhost:4000/mainpage/local")
.then(res=>{
    return res.json();
})
.then(data=>{
    findStore(data);
})
.catch(error=>{
    console.log(error);
});


function findStore(data){
    find.addEventListener("click",function(){
        console.log(data)
    })
    
}