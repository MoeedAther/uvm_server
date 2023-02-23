import mongoose from "mongoose"

// Defining Schema
const usertransactionSchema = new mongoose.Schema({
useremail:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
uproductbarcode:{type:String, required: true, trim:true}, 
uproductname:{type:String, required: true, trim:true},
uproductcategory:{type:String, required: true, trim:true},
uunitprice:{type:String, required: true, trim:true},
uunitspurchased:{type:String, required: true, trim:true},
upurchasetime:{type:String, required: true, trim:true},
umonthandyear:{type:String, required: true, trim:true}, 
uyear:{type:String, required: true, trim:true},
umonth:{type:String, required: true, trim:true},
upurchaseday:{type:String, required: true, trim:true},
utotalamount:{type:String, required: true, trim:true},
})

export default usertransactionSchema
