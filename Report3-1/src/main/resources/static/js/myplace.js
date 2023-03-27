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


find.addEventListener("click",function(){
    store.style.display="block";        // 찾기 버튼 누를 시 가게 정보 보이게 함
    navigator.geolocation.getCurrentPosition(function(position){    // 현재 위치의 위도 경도 찾기
        var places = new kakao.maps.services.Places();
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
         $.ajax({
        type: 'POST',
        url: '/mainpage/location',
        data: {
			 latitude: latitude,
            longitude: longitude
          
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            // 에러 처리 코드
        }
    });
});
});