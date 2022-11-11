import express from 'express'
import router from './routes/web.js'
import cors from 'cors'
import mongoose from 'mongoose'
import userSchema from './schemas/userschema.js'
import venderSchema from './schemas/venderschema.js'

const app = express()
const port = process.env.PORT || '3002'
// const DB_URL="mongodb+srv://moeedather:<>@cluster0.nhiasfk.mongodb.net/?retryWrites=true&w=majority"


//DB Connection
try {
    var conn1 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/UserDatabase?retryWrites=true&w=majority');
    var conn2 = mongoose.createConnection('mongodb+srv://moeedather:tyson@cluster0.nhiasfk.mongodb.net/VenderDatabase?retryWrites=true&w=majority');

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