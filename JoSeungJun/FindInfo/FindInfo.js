document.addEventListener("DOMContentLoaded", function () {
    const RadioId = document.querySelector("#Id");
    const RadioPass = document.querySelector("#Pass");
    const IdSub = document.querySelector(".IdBtn");
    const PassSub = document.querySelector(".PassBtn");
    const FindId = document.querySelector(".FindId");
    const FindPass = document.querySelector(".FindPass");

    function Check(){
        const ID = RadioId.checked;
        const PASS = RadioPass.checked;

        if(ID){
            document.querySelector(".IdInfo").style.display = 'block'
            document.querySelector(".PassInfo").style.display = 'none'
        }
        else if(Pass){
            document.querySelector(".IdInfo").style.display = 'none'
            document.querySelector(".PassInfo").style.display = 'block'
        }
    }

    RadioId.addEventListener("click", Check);
    RadioPass.addEventListener("click", Check);
});

