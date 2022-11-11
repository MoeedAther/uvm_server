import mongoose from 'mongoose';

const connectdb=(DB_URL,DB_Name)=>{
    try {
        const DB_OPTIONS={
            dbName:DB_Name
        }
        const connect_var=mongoose.createConnection(DB_URL,DB_OPTIONS)
        console.log("Successfully connected to "+ DB_Name + " database")
        console.log(connect_var)
                
    } catch (error) {
        console.log(error)
    }
}

export default connectdb