
const Filter = document.querySelector('.filter');
const Fix_Filter = document.querySelector('.Fix_Filter');
const HomeTab = document.querySelector('.homeTab');
const MenuTab = document.querySelector('.MenuTab');
const PhotoTab = document.querySelector('.photoTab');
const ReviewTab = document.querySelector('.userRevieTab');
const Home = document.querySelector('.store_Home');
const Home_Top = window.pageYOffset + Home.getBoundingClientRect().top;
const Menu = document.querySelector('.store_Menu');
const Menu_Top = window.pageYOffset + Menu.getBoundingClientRect().top;

function Top(){
  if(window.scrollY > 625){
    Filter.style.visibility = 'hidden';
    Fix_Filter.style.visibility = 'visible';
  }
  else if(window.scrollY < 625){
    Filter.style.visibility = 'visible';
    Fix_Filter.style.visibility = 'hidden';
  }
}

function Move(element){
  window.scroll({top : element - 100, behavior: 'smooth'});
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