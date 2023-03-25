var slideIndex = 0; //slide index

// HTML 로드가 끝난 후 동작
window.onload=function(){
  showSlides(slideIndex);
  var sec = 3000;
  setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);
  }, sec);
}

function moveSlides(n) {
  slideIndex = slideIndex + n
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {

  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  var size = slides.length;

  if ((n+1) > size) {
    slideIndex = 0; n = 0;    // 슬라이드가 다돌면 다시 처음으로 
  }else if (n < 0) {
    slideIndex = (size-1);    // 슬라이드가 첫번째에서 뒤로더가면 끝으로 이동
    n = (size-1);
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";   // 해당 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[n].style.display = "block";
  dots[n].className += " active";
}