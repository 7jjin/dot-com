const mapWapper = document.querySelector(".mapWapper");

function findmap() {
  if (mapWapper.style.display === "none") {
    var markerPosition = new kakao.maps.LatLng(37.3805645, 126.9268725);

    // 이미지 지도에 표시할 마커입니다
    // 이미지 지도에 표시할 마커는 Object 형태입니다
    var marker = {
      position: markerPosition,
    };

    var staticMapContainer = document.getElementById("staticMap"); // 이미지 지도를 표시할 div
    mapWapper.style.display = "block";
    staticMapContainer.style.position = "absolute";
    staticMapOption = {
      center: new kakao.maps.LatLng(37.3805645, 126.9268725), // 이미지 지도의 중심좌표
      level: 3, // 이미지 지도의 확대 레벨
      marker: marker, // 이미지 지도에 표시할 마커
    };

    // 이미지 지도를 생성합니다
    var staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  } else if (mapWapper.style.display === "block") {
    mapWapper.style.display = "none";
  }
}
