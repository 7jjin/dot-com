function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lon = position.coords.latitude; //위도
            let lat = position.coords.longitude; //경도
            toAddress(lon,lat);
        }, function(error) {
          console.error(error);
        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        });
    }
}


function toAddress(lon,lat){
    console.log(`lon: ${lon}, lat: ${lat}`);
    $.ajax({
        url : `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lat}&y=${lon}&input_coord=WGS84`,
        type : 'GET',
        headers : {
          Authorization : 'kakaoAK {4c52e79e01d745f8fccd4b35c17788e6}'
        },
        success : function(result) {
            let totatlCount = result.meta.total_count; //총 문서 수 
             if (totatlCount > 0) {
                if (result.documents[0].road_address === null) {
                    addressName = result.documents[0].address.region_1depth_name; //지역(시) 이름 
                } else {
                    addressName = result.documents[0].road_address.region_1depth_name;
                }
            }
            addr = addressName;
        },
        error : function(e) {
          console.log(e);
        }
    });
}

$("#btnTest").click(function() {
	getLocation();
})