import mongoose from "mongoose"

// Defining Schema
const Otp = new mongoose.Schema({
Otp:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
uemail:{type:String, required: true, trim:true},
})

export default Otp