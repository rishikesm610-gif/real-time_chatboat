import mongoose from "mongoose";
 
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb is connected")
    }
    catch (error){
        console.log("mongodb not connected")
    }
}

export default connectdb;