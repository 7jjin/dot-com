const nowplace = document.querySelector(".nowplace");
const place = document.querySelector(".place");

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