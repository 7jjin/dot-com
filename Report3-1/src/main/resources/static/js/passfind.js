document.addEventListener("DOMContentLoaded", function () {
    const PassSub = document.querySelector(".FindPass");

    function PassFind(event){
        const Pass = PassSub

        event.preventDefault();

        if(Pass){
            document.querySelector(".PassDiv").style.display = 'none'
            document.querySelector(".PassBtn").style.display = 'none'
            document.querySelector(".PassDiv2").style.display = 'block'
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
        };
      }, true);
    PassSub.addEventListener("submit", PassFind);
});