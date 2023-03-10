const mongoose=require('mongoose');

const insuranceSchema=new mongoose.Schema({
    type:String,
    initials:String,
    firstName:String,
    middleName:String,
    lastName:String,
    mobNo:Number,
    dob:String,
    address:String

});
module.exports=mongoose.model("insurance",insuranceSchema);