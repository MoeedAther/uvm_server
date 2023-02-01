import mongoose from "mongoose"

// Defining Schema
const productsSchema = new mongoose.Schema({
pbarcode:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
pname:{type:String, required: true, trim:true},
pcategory:{type:String, required: true, trim:true},
pprice:{type:String, required: true, trim:true},
pquantity:{type:String, required: true, trim:true},
pdescription:{type:String, required: true, trim:true},
})

const productsCategorySchema = new mongoose.Schema({
    pcategoryname:{type:String, required: true, trim:true},
    })

export {productsSchema, productsCategorySchema}