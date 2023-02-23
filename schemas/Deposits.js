import mongoose from "mongoose"

// Defining Schema
const userdepositSchema = new mongoose.Schema({
useremail:{type:String, required: true, trim:true}, // trim basically removes end spaces from value being stored
udepositamount:{type:String, required: true, trim:true},
udeposityear:{type:String, required: true, trim:true},
udepositmonth:{type:String, required: true, trim:true},
})

export default userdepositSchema
