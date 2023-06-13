// let Profile_Image = document.querySelector(".Profile_Image");

// console.log(Profile_Image.src);

// if (Profile_Image.src === null) {
//   // 기본값
//   console.log("a");
// } else {
//   // 바뀐값
//   console.log("b");
// }

document.addEventListener("DOMContentLoaded", function () {
  const realUpload = document.querySelector(".Upload");
  const load = document.querySelector(".Photo_Edit");
  const photo = document.querySelector(".Profile_Image");

  function getImageFiles(e) {
    const files = e.currentTarget.files;
    console.log(typeof files, files);
  }
  function change() {
    let selectFile = realUpload.files[0];
    const file = URL.createObjectURL(selectFile);

    photo.src = file;
  }

  load.addEventListener("click", () => realUpload.click());
  realUpload.addEventListener("change", change);
});
