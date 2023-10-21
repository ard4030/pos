
const { default: axios } = require("axios");
import { hash, compare } from "bcryptjs";
// const path = require("path");
// const fs = require("fs");


function RandomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}

async function farazSms(mobile, code) {
    const body =  {
        op: "pattern",
        user: "09164524864",
        pass: "faraz6550047404",
        fromNum: "5000125475",
        toNum: `${+mobile}`,
        patternCode: "6cdq3d5g14wzjb7",
        inputData: [
          { code: code },
          // {"brand":"bmw"}
        ],
    }

    let res = false;
    await axios.post('http://ippanel.com/api/select',body).then(response => {
        if(!response.statusCode === 200){
            res = false;  
        }else{
            res =  true
        }
    }).catch(err => {
        console.log(err.message)
        res =  false
    })
    return res;
}

// async function updateUser(mobile,objectData = {}){
//     Object.keys(objectData).forEach(key => {
//         if([""," ",0,null,undefined,NaN,"0"].includes(objectData[key])) delete objectData[key]
//     })
//     const updateResult = User.updateOne({mobile},{$set : objectData})
//     return !!(await updateResult).modifiedCount
// }

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

// function createUploadPath(mobile) {
//     const userUploadId = mobile+""
//     const uploadPath = path.join(__dirname,"..","..","public","imagUpload",userUploadId);
//     fs.mkdirSync(uploadPath,{recursive:true});
//     return path.join("public","imagUpload",userUploadId)
// }

function checkStatus(status){
    switch (status) {
        case "deviceSelect":
            return "دستگاه انتخاب شده"
            break;
        case "detailComplate":
            return "مشخصات تکمیل شده"
            break;
        case "uploading":
            return "مدارک آپلود شده" 
            break;
        case "pending":
            return "درحال بررسی" 
            break;
        case "waitPayment":
            return "در انتظار پرداخت"   
            break;  
        case "success":
            return "پرداخت شده در انتظار ارسال"  
            break; 
        case "needEdit":
            return "نیاز به ویرایش" 
            break;
        case "denield":
            return "رد شده"    
            break;      
        default:
            break;
    }

}



module.exports = {
    RandomNumberGenerator,
    farazSms,
    // updateUser,
    hashPassword,
    verifyPassword,
    // createUploadPath,
    checkStatus
}