import mongoose from "mongoose"

// Defining Schema
const usertransactionSchema = new mongoose.Schema({
uproductbarcode:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
uproductname:{type:String, required: true, trim:true},
uproductcategory:{type:String, required: true, trim:true},
uunitprice:{type:String, required: true, trim:true},
uunitspurchased:{type:String, required: true, trim:true},
upurchasetime:{type:String, required: true, trim:true},
upurchaseday:{type:String, required: true, trim:true},
utotalamount:{type:String, required: true, trim:true},

})

export default usertransactionSchema
