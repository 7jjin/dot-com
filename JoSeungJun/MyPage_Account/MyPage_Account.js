document.addEventListener("DOMContentLoaded", function () {

const realUpload = document.querySelector('.Upload');
const load = document.querySelector('.Photo_Edit');
const photo = document.querySelector('.Profile_Image');

function getImageFiles(e) {
    const files = e.currentTarget.files;
    console.log(typeof files, files);
}
function change(){
    let selectFile = realUpload.files[0];
    const file = URL.createObjectURL(selectFile);

    photo.src = file;
}

load.addEventListener('click', () => realUpload.click());
realUpload.addEventListener('change', change);
});