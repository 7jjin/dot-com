'use strict';

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
const movein = document.querySelector(".movein");
const moveout = document.querySelector(".moveout");



let margin = window.getComputedStyle(quickfilter).marginTop;

document.addEventListener("click",filterUp);
document.addEventListener("click",filterDown);

function filterUp(event){
    var target = event.target.closest("section").className;
    console.log(target)
        if(target==='quickfilter'){
            quickfilter.classList.remove("moveout");
            quickfilter.classList.add("movein");
            wrap.classList.remove("blurout");   
            wrap.classList.add("blurin");
            wrap.style.backgroundColor="rgb(128 128 128 / 26%)";
        }
        console.log(quickfilter.classList.contains('movein'))
    }

// filterBox를 클릭했을때 filterbox가 올라가는 함수.


function filterDown(event){
    var filterclass = quickfilter.className;
    var target = event.target.closest("section").className;
    if(margin === "100px"){
        if(target!=='quickfilter'|| target===null){
            quickfilter.classList.remove("movein");
            quickfilter.classList.add("moveout");
            wrap.classList.remove("blurin");
            wrap.classList.add("blurout");
            wrap.style.backgroundColor="";
        }
    }   
}
// filterBox를 제외한 곳을 눌렀을 경우에는 내려가는 함수
    
    


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



