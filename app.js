import express from 'express'
import router from './routes/web.js'
import cors from 'cors'
import mongoose from 'mongoose'
import userSchema from './schemas/userschema.js'
import venderSchema from './schemas/venderschema.js'
import productsSchema from './schemas/productsschema.js'
import usertransactionSchema from './schemas/usertransactionschema.js'
import vendertransactionSchema from './schemas/vendertransactionschema.js'

const app = express()
const port = process.env.PORT || '3001'
// const DB_URL="mongodb+srv://moeedather:<>@cluster0.nhiasfk.mongodb.net/?retryWrites=true&w=majority"
const DB1_URL="mongodb://localhost:27017/UserDatabase"
const DB2_URL="mongodb://localhost:27017/VenderDatabase"
const DB3_URL="mongodb://localhost:27017/Products"

//DB Connection
try {
    var conn1 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/UserDatabase?retryWrites=true&w=majority');
    var conn2 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/VenderDatabase?retryWrites=true&w=majority');
    var conn3 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/Products?retryWrites=true&w=majority')

    // var conn1 = mongoose.createConnection(DB1_URL)
    // var conn2 = mongoose.createConnection(DB2_URL)
    // var conn3 = mongoose.createConnection(DB3_URL)
    
    console.log("Connection established with UserDatabase, VenderDatabase and Products")

} catch (error) {
    console.log(error)
}

//Model (Compiling Schema)
const userModel = conn1.model('user_data', userSchema);
const userTransactionModel = conn1.model('user_transaction', usertransactionSchema);
const venderModel = conn2.model('vender_data', venderSchema);
const venderTransactionModel = conn2.model('vender_transaction', vendertransactionSchema);
const productsModel = conn3.model('productsinfo', productsSchema);


//JSON
app.use(express.json())

//Cors
app.use(cors())

//Loading Routes
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

export { userModel, venderModel, productsModel , userTransactionModel, venderTransactionModel}