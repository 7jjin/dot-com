const quickfilter  = document.querySelector(".quickfilter");
const myplace = document.querySelector(".myplace");
const menu = document.querySelector(".menu");
const meun = document.querySelector(".meun");
const doo = document.querySelector(".doo");
const si = document.querySelector(".si");
const body = document.querySelector("body");
const wrap = document.querySelector("#wrap");
const filterRegion = document.querySelector(".filterRegion");
const filterMenu = document.querySelector(".filterMenu");
const nowbutton = document.querySelector(".nowplace button");
const section = document.querySelector("section");


quickfilter.addEventListener("click",filterUp);
body.addEventListener("click",filterDown);

function filterUp(event){
    let target = event.target;
    if(target.closest(".doo")||target.closest(".si")||target.closest("button")){
        quickfilter.style.marginTop = "100px";
        wrap.style.filter="blur(5px)";
        wrap.style.backgroundColor="rgb(128 128 128 / 26%)";
    }
}
// '도','시','내위치' 만 클릭했을때 filterbox가 올라가는 함수.


function filterDown(event){
    var filterclass = quickfilter.className;
    var regionname = filterRegion.className;
    var menuname =  menu.className;
    var placename  = myplace.className;
    var target = event.target.closest("section").className;
    if(quickfilter.style.marginTop="100px"){
        if(filterclass!==target){
            quickfilter.style.marginTop = "516px";
            wrap.style.filter="none";
            wrap.style.backgroundColor="";
        }
    }   
    
}

    
    


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



