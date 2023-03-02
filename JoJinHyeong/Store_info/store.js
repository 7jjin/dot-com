const Filter = document.querySelector('.filter');
const Blank = document.querySelector('.blank');
const HomeTab = document.querySelector('.homeTab');
const MenuTab = document.querySelector('.MenuTab');
const PhotoTab = document.querySelector('.photoTab');
const ReviewTab = document.querySelector('.userRevieTab');
const Home = document.querySelector('.store_Home');
const Home_Top = window.pageYOffset + Home.getBoundingClientRect().top;
const Menu = document.querySelector('.store_Menu');
const Menu_Top = window.pageYOffset + Menu.getBoundingClientRect().top;

function Top(){
  var rect1 = Filter.getBoundingClientRect();
  var rect2 = Blank.getBoundingClientRect();

  if(window.scrollY > 625){
    Filter.style.position = "fixed";
    Filter.style.top = "0";
    Filter.style.boxShadow = "0px 0px 0px 0px";
  }
  else if(window.scrollY < 625){
    Filter.style.position = "";
    Filter.style.top = "";
    Filter.style.boxShadow = "0px 20px 20px 0px #ddd";
  }
}

function Move(element){
  window.scroll({top : element - 200, behavior: 'smooth'});
}

HomeTab.addEventListener('click', function(){
  Move(Home_Top);
});
MenuTab.addEventListener('click', function(){
  Move(Menu_Top);
});

window.addEventListener('scroll', () => { 
  Top();
});
