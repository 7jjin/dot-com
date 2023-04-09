const Menu1 = document.querySelector(".Menu");
const menuName1 = document.querySelector(".MenuName");
const MenuPrice1 = document.querySelector(".MenuPrice");
console.log(MenuPrice1.innerHTML)
console.log(menuName1.innerHTML)
console.log(Menu1.innerHTML)

fetch("http://localhost:3000/api/store?adminNo=1")
.then((res)=>{
    return res.json()
})
.then((obj)=>{
    Info(obj);
})
.catch((err)=>console.log(err))

function Info(obj){
    Menu1.innerHTML = Object.keys(obj)[0]
    menuName1.innerHTML = obj.스테이크[0].menuName;
    MenuPrice1.innerHTML = obj.스테이크[0].menuPrice;
}