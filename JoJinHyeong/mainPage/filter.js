const quickfilter  = document.querySelector(".quickfilter");
const myplace = document.querySelector(".myplace");
const menu = document.querySelector(".menu");
const doo = document.querySelector(".doo");
const si = document.querySelector(".si");
const body = document.querySelector("body");
const wrap = document.querySelector("#wrap");
const filterRegion = document.querySelector(".filterRegion");
const filterMenu = document.querySelector(".filterMenu");
const nowbutton = document.querySelector(".nowplace button");
const section = document.querySelector("section");
const filterBar_button = document.querySelector(".filterBar_Names");


document.addEventListener("click",filter);

function filter(event){
    var target = event.target.closest("section").className;
    const quickfilter  = document.querySelector(".quickfilter");
    
    if(target!=='quickfilter movein'&&quickfilter.classList.contains("movein")===true){
        quickfilter.classList.remove("movein");
        quickfilter.classList.add("moveout");       
        wrap.classList.remove("blurin");
        wrap.classList.add("blurout");
        wrap.style.backgroundColor="";
        store.style.display="none";         // 필터가 내려가면 가게 정보 안보이게 함
    }    
    if(target==='quickfilter'|| target==="quickfilter moveout"){
        quickfilter.classList.remove("moveout");
        quickfilter.classList.add("movein");
        wrap.classList.remove("blurout");   
        wrap.classList.add("blurin");
        wrap.style.backgroundColor="rgb(128 128 128 / 26%)";
    }
}
// 필터를 올리고 내리는 함수

myplace.addEventListener("click",()=>{
    filterRegion.style.display="flex";
    myplace.style.backgroundColor="white";
    menu.style.backgroundColor="#da9c68bf";
    filterMenu.style.display="none";
});
menu.addEventListener("click",()=>{
    filterMenu.style.display="flex";
    menu.style.backgroundColor="white";
    myplace.style.backgroundColor="#0de0e5ed";
    filterRegion.style.display="none";
});
// 해당버튼 누르면 해당 메뉴 나오는 함수


