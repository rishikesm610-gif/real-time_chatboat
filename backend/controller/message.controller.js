import uploadoncloudinary from "../config/cloudinary.js";
import Conversastion from "../model/convesastion.model.js";
 
import Message from "../model/message.model.js";
import { io , getreceiversocketid } from "../socket/socket.js";


export const sendmessage=async (req,res)=>{
    try {
        let sender=req.userid
        let {receiver}=req.params
        let {message}=req.body
        let image="";

        if(req.file){
            image=await uploadoncloudinary(req.file.path)
        }
        let conversastion=await Conversastion.findOne({
            participant:{$all:[sender,receiver]}
        })
        let newmessage=await Message.create({
            sender, receiver, message, image
        })

        if(!conversastion){
            conversastion=await Conversastion.create({
                participant:[sender,receiver],
                messages:[newmessage._id]
            })
        }
        else{
            conversastion.messages.push(newmessage._id)
            await conversastion.save()
        }
        const receiversocketid=getreceiversocketid(receiver)
        if(receiversocketid){
            io.to(receiversocketid).emit("newmessage", newmessage)
        }
        return res.status(201).json(newmessage)
        
    } catch (error) {
        return res.status(500).json({message: `send message error ${error}`})
    }

}


export const getmessage=async(req,res)=>{
    try {

        let sender=req.userid
        let {receiver}=req.params

        let conversastion=await Conversastion.findOne({
            participant:{$all:[sender, receiver]
            }
        }).populate("messages")

        if(!conversastion){
            return res.status(400).json({message:"conversastion not found"})
        }
        return res.status(200).json(conversastion?.messages)

        
    } catch (error) {
         return res.status(500).json({message: `get message error ${error}`})
    }
}