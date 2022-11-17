import mongoose from "mongoose"

// Defining Schema
const vendertransactionSchema = new mongoose.Schema({
vproductbarcode:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
vproductname:{type:String, required: true, trim:true},
vproductcategory:{type:String, required: true, trim:true},
vunitprice:{type:String, required: true, trim:true},
vunitspurchased:{type:String, required: true, trim:true},
vpurchasetime:{type:String, required: true, trim:true},
vtotalamount:{type:String, required: true, trim:true},
})

export default vendertransactionSchema
