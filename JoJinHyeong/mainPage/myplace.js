const nowplace = document.querySelector(".nowplace");
const place = document.querySelector(".place");
const find = document.querySelector(".find");


nowplace.addEventListener("click",function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var geocoder = new kakao.maps.services.Geocoder();        
        var callback = function(result,status){
            if(status === kakao.maps.services.Status.OK){
                console.log(result)
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

// 버튼 클릭시 역지오코딩으로 현재 사용자 위치를 좌표로 구해서 지역으로 나타내는 방법을 사용했다.

find.addEventListener("click",function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var places = new kakao.maps.services.Places();
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        console.log(long,lat)
        var callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result.sort((a,b)=>a.distance-b.distance))
            }
        };
        places.categorySearch('FD6', callback, {
            // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
            location: new kakao.maps.LatLng(lat,long)
        });
    });
});