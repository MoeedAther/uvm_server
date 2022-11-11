import mongoose from "mongoose";

// Defining Schema
const venderSchema= new mongoose.Schema({
vfirstname:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
vlastname:{type:String, required: true, trim:true},
vemail:{type:String, required: true, trim:true},
vphonenumber:{type:String, required: true, trim:true},
vpassword:{type:String, required: true, trim:true}
})


export default venderSchema