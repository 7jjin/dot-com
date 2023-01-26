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
const blurin = document.querySelector(".blurin")


let margin = window.getComputedStyle(quickfilter).marginTop;

//document.addEventListener("click",filterDown);
document.addEventListener("click",filterUp);

function filterUp(event){
    var target = event.target.closest("section").className;
    const quickfilter  = document.querySelector(".quickfilter");
    //console.log(target)
    if(target==='quickfilter'||quickfilter.classList.contains("moveout")===true){
        console.log("a")
        quickfilter.classList.remove("moveout");
        quickfilter.classList.add("movein");
        wrap.classList.remove("blurout");   
        wrap.classList.add("blurin");
        wrap.style.backgroundColor="rgb(128 128 128 / 26%)";
    }
}

// // filterBox를 클릭했을때 filterbox가 올라가는 함수.

// function filterDown(event){
//     var target = event.target.closest("section").className;
//     const quickfilter  = document.querySelector(".quickfilter");
//     console.log("b")
//     if(target!=='quickfilter'&&quickfilter.classList.contains("movein")===true)
//     console.log("c")
//         quickfilter.classList.remove("movein");
//         quickfilter.classList.add("moveout");
//         wrap.classList.remove("blurin");
//         wrap.classList.add("blurout");
//         wrap.style.backgroundColor="";
// } 
// filterBox를 제외한 곳을 눌렀을 경우에는 내려가는 함수
    
// function filterup(){
//     return new Promise((resolve,reject)=>{
//         document.addEventListener("click",function(){
//             if(target==='quickfilter'){
//                 quickfilter.classList.remove("moveout");
//                 quickfilter.classList.add("movein");
//                 wrap.classList.remove("blurout");   
//                 wrap.classList.add("blurin");
//                 wrap.style.backgroundColor="rgb(128 128 128 / 26%)";
//             }
//         });
//     })
//     async function filterDown(){
//         await filterup().then;
//     }
// }


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



