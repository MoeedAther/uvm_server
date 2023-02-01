import mongoose from "mongoose"

// Defining Schema
const userSchema = new mongoose.Schema({
ufirstname:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
ulastname:{type:String, required: true, trim:true},
uemail:{type:String, required: true, trim:true},
ucountrycode:{type:String, required: true, trim:true},
uphonenumber:{type:String, required: true, trim:true},
upassword:{type:String, required: true, trim:true},
ubarcode:{type:String, required: true, trim:true},
ubalance:{type:String, required: true, trim:true, default:"0"}
})

export default userSchema