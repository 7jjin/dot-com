document.addEventListener("DOMContentLoaded", function () {
    const RadioId = document.querySelector("#Id");
    const RadioPass = document.querySelector("#Pass");
    const IdSub = document.querySelector(".FindId");
    const PassSub = document.querySelector(".FindPass");

    function Check(event){
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

    function IdFind(event){
        const Id = IdSub

        event.preventDefault();

        if(Id){
            document.querySelector(".IdDiv").style.display = 'none'
            document.querySelector(".IdBtn").style.display = 'none'
            document.querySelector(".IdDiv2").style.display = 'block'
        }
    }
    function PassFind(event){
        const Pass = PassSub

        event.preventDefault();

        if(Pass){
            document.querySelector(".PassDiv").style.display = 'none'
            document.querySelector(".PassBtn").style.display = 'none'
            document.querySelector(".PassDiv2").style.display = 'block'
        }
    }

    RadioId.addEventListener("click", Check);
    RadioPass.addEventListener("click", Check);
    IdSub.addEventListener("submit", IdFind);
    PassSub.addEventListener("submit", PassFind);
});

