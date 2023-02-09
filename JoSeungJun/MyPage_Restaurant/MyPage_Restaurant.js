document.addEventListener("DOMContentLoaded", function () {

    const realUpload = document.querySelector('.Upload');
    const load = document.querySelector('.Photo_Edit');
    const photo = document.querySelector('.Profile_Image');
    const Open_Btn = document.querySelector('.Open');
    const Close_Btn = document.querySelector('.Close');
    const Last_Btn = document.querySelector('.Last');
    const Confirm_Btn = document.querySelector('.Confirm')
    const Edit_Input = document.querySelector('.Time_Input');
    const Week_Check = document.querySelector('#week_check');


    function handleSubmit(event) {
        event.preventDefault()
        value = '' ;
    }
    
    function change(){
        let selectFile = realUpload.files[0];
        const file = URL.createObjectURL(selectFile);
    
        photo.src = file;
    }

    function Edit(){
        Edit_Input.innerHTML = `
        <form class="TimeEdit" action="">
            <input type="text", placeholder = "시간을 입력 해 주세요"> 
        </form>
        `;

        document.querySelector(".TimeEdit").addEventListener("submit",function() {
            const Input = document.querySelector(".TimeEdit");

            Edit_Input.value = Input.value;
        })
    }

    function week(){
        alert(Week_Check.value + "요일로 수정 되었습니다.")
    }

    Open_Btn.addEventListener('click', Edit);
    Close_Btn.addEventListener('click', Edit);
    Last_Btn.addEventListener('click', Edit);
    Confirm_Btn.addEventListener('click', week);
    load.addEventListener('click', () => realUpload.click());
    realUpload.addEventListener('change', change);
    });