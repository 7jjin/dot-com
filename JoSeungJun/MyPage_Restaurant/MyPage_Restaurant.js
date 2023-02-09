document.addEventListener("DOMContentLoaded", function () {

    const realUpload = document.querySelector('.Upload');
    const load = document.querySelector('.Photo_Edit');
    const photo = document.querySelector('.Profile_Image');
    const Edit_Btn = document.querySelector('.Btn');
    const Edit_Input = document.querySelector('.Time_Input');

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

    Edit_Btn.addEventListener('click', Edit);
    load.addEventListener('click', () => realUpload.click());
    realUpload.addEventListener('change', change);
    });