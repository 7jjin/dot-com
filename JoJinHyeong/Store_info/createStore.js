const nameStore = document.querySelector(".name");
const storeIntro = document.querySelector(".storeIntro");
const addr = document.querySelector(".AddressInfo");
const Menu2 = document.querySelector(".Menu");
const menuName1 = document.querySelector(".MenuName1");
const menuName2 = document.querySelector(".MenuName2")
const menuPrice1 = document.querySelector(".MenuPrice1");
const menuPrice2 = document.querySelector(".MenuPrice2");
const call = document.querySelector(".CallInfo");
const week = document.querySelector(".Week");
const openTime = document.querySelector(".OpenTime");
const closeTime = document.querySelector(".CloseTime");

const uni = sessionStorage.getItem("selectedValue");
const url = `http://localhost:4000/store?adminNo=${uni}`;
fetch(url)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    openingDay(data);
    renderPage(data);

})
.catch((err)=>console.log(err))



function renderPage(data){
    for(let i=0;i<data[0].categories.length;i++){
        addr.innerHTML=`${data[0].addressName}`;
        call.innerHTML=`${data[0].storePhone}`;
        openTime.innerHTML = `${data[0].openingTime}`;
        closeTime.innerHTML = `${data[0].closingTime}`;
        nameStore.innerHTML=`${data[0].adminCafe}`;
        storeIntro.innerHTML=`${data[0].storeIntroduce}`
        // 카테고리별로 박스 만들어서 appendChild로 추가
        const menubox = document.createElement("div");
        menubox.innerHTML = `<a class="MenuItem">
        <h1 class="Menu${i+1}">${data[0].categories[i].categoryName}</h1>
        </a>`
        Menu2.appendChild(menubox);
        console.log(data[0].categories[i].menuList)
        for(let j=0;j<data[0].categories[i].menuList.length;j++){
            const menulist = document.createElement("div");
            menulist.innerHTML = `<a class="SubItem">
            <div class="MenuInfo">
              <div class="MenuName">
                <h4>
                  <strong class="MenuName1">${data[0].categories[i].menuList[j].menuName}</strong>
                </h4>
              </div>
              <span class="MenuPrice1">${data[0].categories[i].menuList[j].menuPrice}</span>
              <span>원</span>
            </div>
            <div class="MenuImg" style="background-image: URL(/img/Relief.jpg);"></div>
            </a>`;
            Menu2.appendChild(menulist);
        }
        const bar = document.createElement("hr");
        bar.className = "line";
        Menu2.append(bar)
    }
}


// 운영요일 구하는 함수
function openingDay(data){
    const day = String(data[0].weekday);
    let daylist = "";
    for(let i=0;i<day.length;i++){
        if(day[i]==="0") daylist+="일 ";
        else if(day[i]==="1") daylist+="월 ";
        else if(day[i]==="2") daylist+="화 ";
        else if(day[i]==="3") daylist+="수 ";
        else if(day[i]==="4") daylist+="목 ";
        else if(day[i]==="5") daylist+="금 ";
        else if(day[i]==="6") daylist+="토 ";
    }
    week.innerHTML = daylist
}

