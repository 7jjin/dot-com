
const nameStore = document.querySelector(".name");
const storeIntro = document.querySelector(".storeIntro");
const addr = document.querySelector(".AddressInfo");
const category1 = document.querySelector(".Menu1");
const menuName1 = document.querySelector(".MenuName1");
const menuName2 = document.querySelector(".MenuName2")
const menuPrice1 = document.querySelector(".MenuPrice1");
const menuPrice2 = document.querySelector(".MenuPrice2");
const call = document.querySelector(".CallInfo");

const uni = sessionStorage.getItem("selectedValue");
const url = `http://localhost:4000/store?adminNo=${uni}`;
fetch(url)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    renderPage(data);
})
.catch((err)=>console.log(err))

function renderPage(data){
    addr.innerHTML=`${data[0].addressName}`
    call.innerHTML=`${data[0].storePhone}`
    nameStore.innerHTML=`${data[0].adminCafe}`
    storeIntro.innerHTML=`${data[0].storeIntroduce}`
    category1.innerHTML=`${data[0].categories[1].categoryName}`
    menuName1.innerHTML=`${data[0].categories[1].menuList[0].menuName}`
    menuPrice1.innerHTML=`${data[0].categories[1].menuList[0].menuPrice}`
    menuName2.innerHTML=`${data[0].categories[1].menuList[1].menuName}`
    menuPrice2.innerHTML=`${data[0].categories[1].menuList[1].menuPrice}`
}

// export function fetchData(){
//     return fetch(url)
//         .then(res=>res.json())
//         .catch(err=>console.log(err));
// }
