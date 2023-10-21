import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    firts_name : {type:String , default:""},
    last_name : {type:String , default:""},
    city : {type:String , default:""},
    address : {type:String , default:""},
    postalCode : {type:String , default:""},
    mobile : {type:String,required : true},
    email : {type:String, lowercase:true},
    userName : {type:String, lowercase:true},
    password : {type:String,default:null},
    otp : {type:Object,default:{
        code:0,
        expiresIn: 0,
        timeSend:0
    }},
    bills : {type:[], default:[]},
    discount : {type:Number,default:0},
    birsday : {type:String},
    Roles : {type:[String] , default:['USER']},
    bookmarks : {type : [mongoose.Types.ObjectId], default : []},
    
},
{ timestamps: true });

const User = models.User || model("User", userSchema);

export default User;
