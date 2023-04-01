//import {getSelectedValue} from '../mainPage/storeList.js';

const selectedValue = sessionStorage.getItem("selectedValue");
console.log(selectedValue)

fetch(" http://localhost:4000/store?adminNo=1")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data);
})
.catch((err)=>console.log(err))

// function Info(data){
//     console.log(data)
// }

//http://127.0.0.1:5501/JoJinHyeong/Store_info/store.html

