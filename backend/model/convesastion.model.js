import mongoose from "mongoose";


const conversastionSchema=new mongoose.Schema({
    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:"Message"
        }
    ]

},{timestamps:true})

const Conversastion=mongoose.model("Convesastion", conversastionSchema)
export default Conversastion