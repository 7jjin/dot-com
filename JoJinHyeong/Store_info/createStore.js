import {number} from '../mainPage/storeList.js';

fetch(" http://localhost:3000/store?adminNo=1")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data);
    number();
})
.catch((err)=>console.log(err))

function Info(data){
    console.log(data)
}

//http://127.0.0.1:5501/JoJinHyeong/Store_info/store.html

