const map = document.querySelector(".map");
const mapWapper = document.querySelector(".mapWapper");

function findmap() {
  const uni = sessionStorage.getItem("selectedValue");
  const url = `http://localhost:4000/store?adminNo=${uni}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const latitude = data[0].latitude;
      const longitude = data[0].longitude;

      const etcHeight = document.querySelector(".etc");
      const Height = etcHeight.offsetTop + etcHeight.clientHeight;
      console.log(Height);

      if (mapWapper.style.display === "none") {
        var markerPosition = new kakao.maps.LatLng(longitude, latitude);

        // 이미지 지도에 표시할 마커입니다
        // 이미지 지도에 표시할 마커는 Object 형태입니다
        var marker = {
          position: markerPosition,
        };

        var staticMapContainer = document.getElementById("staticMap"); // 이미지 지도를 표시할 div
        mapWapper.style.display = "block";
        mapWapper.style.top = `${Height}px`;
        staticMapContainer.style.position = "absolute";
        staticMapOption = {
          center: new kakao.maps.LatLng(longitude, latitude), // 이미지 지도의 중심좌표
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
    })
    .catch((err) => console.log(err));
}

map.addEventListener("click", findmap);
