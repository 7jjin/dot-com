document.addEventListener("DOMContentLoaded", function () {

    const realUpload = document.querySelector('.Upload');
    const load = document.querySelector('.Photo_Edit');
    const photo = document.querySelector('.Profile_Image');
    const Open_Btn = document.querySelector('.Open');
    const Close_Btn = document.querySelector('.Close');
    const Last_Btn = document.querySelector('.Last');
    const Confirm_Btn = document.querySelector('.Confirm')
    const Open_Input = document.querySelector('.Open_Input');
    const Close_Input = document.querySelector('.Close_Input');
    const Last_Input = document.querySelector('.Last_Input');
    const Main = document.querySelector(".Edit_Restaurant1");
    const Serve1 = document.querySelector(".Edit_Restaurant2");
    const Serve2 = document.querySelector(".Edit_Restaurant3");
    const Main_photo = document.querySelector(".Picture_Restaurant_1");
    const Serve1_photo = document.querySelector(".Picture_Restaurant_2");
    const Serve2_photo = document.querySelector(".Picture_Restaurant_3");
    const Main_Ex = document.querySelector(".Main_Ex");
    const Serve1_Ex = document.querySelector(".Serve1_Ex");
    const Serve2_Ex = document.querySelector(".Serve2_Ex");
    const Main_Image = document.querySelector(".Main_Image");
    const Serve1_Image = document.querySelector(".Serve_Image1");
    const Serve2_Image = document.querySelector(".Serve_Image2");

    function Time_Edit(Element) {
        Element.innerHTML = `
        <form class="TimeEdit" action="">
            <input class="inputvalue" type="text", placeholder = "시간을 입력 해 주세요"> 
        </form>
        `;

        document.querySelector(".TimeEdit").addEventListener("submit", function () {
            const Input = document.querySelector(".inputvalue");

            Element.innerHTML = Input.value;
        })
    }

    function week() {
        var obj_length = document.getElementsByName("week");
        var msg = ("수정되었습니다.");

        for (var i = 0; i < obj_length.length; i++) {
            if (obj_length[i].checked) {
                msg = (obj_length[i].value + " ") + msg;
            }
        }
        alert(msg);
    }

    function Image_Edit(e,Element,i) {
        let selectFile = e.files[0];
        const file = URL.createObjectURL(selectFile);

        Element.src = file;
        i.remove();
    }
    
    /*매장 시간 수정 함수*/
    Open_Btn.addEventListener('click', function() {
        Time_Edit(Open_Input)
    });
    Close_Btn.addEventListener('click', function() {
        Time_Edit(Close_Input)
    });
    Last_Btn.addEventListener('click', function() {
        Time_Edit(Last_Input)
    });

    /*매장 여는 요일 수정 함수*/
    Confirm_Btn.addEventListener('click', week);

    /*사진 업로드 대신해주는 함수*/
    load.addEventListener('click', () => realUpload.click());
    Main_photo.addEventListener('click', () => Main.click());
    Serve1_photo.addEventListener('click', () => Serve1.click());
    Serve2_photo.addEventListener('click', () => Serve2.click());

    /*이미지 업로드 함수*/
    realUpload.addEventListener('change', function() {
        Image_Edit(realUpload,photo)
    });
    Main.addEventListener('change', function() {
        Image_Edit(Main,Main_Image,Main_Ex)
    });
    Serve1.addEventListener('change', function() {
        Image_Edit(Serve1,Serve1_Image,Serve1_Ex)
    });
    Serve2.addEventListener('change', function() {
        Image_Edit(Serve2,Serve2_Image,Serve2_Ex)
    });
});