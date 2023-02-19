const slider = document.querySelector('.barlist');
let isMouseDown = false;
let startX, scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  scrollLeft = slider.scrollLeft;
  startX = e.pageX - slider.offsetLeft;
});

slider.addEventListener('mouseleave', () => {
  isMouseDown = false;
});

slider.addEventListener('mouseup', () => {
  isMouseDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

// 인원수 가로 스크롤
// ---------------------------------------------------------------------------

const bar = document.querySelector(".remote_Bar");
    
window.addEventListener('scroll', function(){
    bar.style.top = `${window.scrollY}px`;
    bar.style.transition = "all 0.7s ease-out";
    if(window.scrollY===0){
      bar.style.top = '100px';
    }
})