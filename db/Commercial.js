const mongoose=require('mongoose');

const commercialSchema=new mongoose.Schema({
    name:String,
    age:Number,
    price:String,
    category:String,
    company:String
});
module.exports=mongoose.model("Commercial",commercialSchema);