import express from 'express'
import router from './routes/web.js'
import cors from 'cors'
import mongoose from 'mongoose'
import userSchema from './schemas/userschema.js'
import venderSchema from './schemas/venderschema.js'

const app = express()
const port = process.env.PORT || '3001'
// const DB_URL="mongodb+srv://moeed:ather@cluster0.c01xmp1.mongodb.net/uvm?retryWrites=true&w=majority"

const DB_URL = "mongodb://localhost:27017"

//DB Connection
try {
    var conn1 = mongoose.createConnection('mongodb://localhost:27017/UserDatabase');
    var conn2 = mongoose.createConnection('mongodb://localhost:27017/VenderDatabase');

    console.log("Connection established with UserDatabase and VenderDatabase")

} catch (error) {
    console.log(error)
}

//Model (Compiling Schema)
const userModel = conn1.model('user_data', userSchema);
const venderModel = conn2.model('vender_data', venderSchema);

//JSON
app.use(express.json())

//Cors
app.use(cors())

//Loading Routes
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

export { userModel, venderModel }