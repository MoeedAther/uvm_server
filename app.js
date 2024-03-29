import express from 'express'
import router from './routes/web.js'
import cors from 'cors'
import mongoose from 'mongoose'
import userSchema from './schemas/userschema.js'
import {productsSchema, productsCategorySchema} from './schemas/productsschema.js'
import usertransactionSchema from './schemas/usertransactionschema.js'
import  userdepositSchema from './schemas/Deposits.js'
import Otp from './schemas/Otp.js'
// import { withdraw } from './controllers/withdrawdeposit.js'




const app = express()
const port = process.env.PORT || '3000'
// const DB_URL="mongodb+srv://moeedather:<>@cluster0.nhiasfk.mongodb.net/?retryWrites=true&w=majority"
const DB1_URL="mongodb://localhost:27017/UserDatabase"
// const DB2_URL="mongodb://localhost:27017/VenderDatabase"
const DB3_URL="mongodb://localhost:27017/Products"

//DB Connection
try {
    var conn1 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/UserDatabase?retryWrites=true&w=majority');
    // var conn2 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/VenderDatabase?retryWrites=true&w=majority');
    var conn3 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/Products?retryWrites=true&w=majority')

    // var conn1 = mongoose.createConnection(DB1_URL)
    // var conn2 = mongoose.createConnection(DB2_URL)
    // var conn3 = mongoose.createConnection(DB3_URL)
    
    console.log("Connection established with UserDatabase and ProductsDatabase")

} catch (error) {
    console.log(error)
}

//Model (Compiling Schema)
const userModel = conn1.model('user_data', userSchema);
const userTransactionModel = conn1.model('user_transaction', usertransactionSchema);
const productsModel = conn3.model('productsinfo', productsSchema);
const productsCategoryModel = conn3.model('product_category', productsCategorySchema);
const depositModel=conn1.model('deposits', userdepositSchema)
const OtpModel = conn1.model('Otp', Otp)






//JSON
app.use(express.json())

//Cors
app.use(cors())

//Loading Routes
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

export { userModel, productsModel , userTransactionModel, productsCategoryModel, depositModel,OtpModel}