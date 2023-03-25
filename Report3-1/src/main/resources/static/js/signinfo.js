document.addEventListener("DOMContentLoaded", function () {
    const IdSub = document.querySelector(".FindId");

    function IdFind(event){
        const Id = IdSub

        event.preventDefault();

        if(Id){
            document.querySelector(".IdDiv").style.display = 'none'
            document.querySelector(".IdBtn").style.display = 'none'
            document.querySelector(".IdDiv2").style.display = 'block'
        }
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
        };
      }, true);
    IdSub.addEventListener("submit", IdFind);
});