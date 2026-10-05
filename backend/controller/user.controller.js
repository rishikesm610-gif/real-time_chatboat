import uploadoncloudinary from "../config/cloudinary.js"
import User from "../model/user.model.js"

export const getcurrentuser=async (req , res)=>{
    try {
        
        let userid=req.userid
        let user=await User.findById(userid).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`currentuser not found ${error}`})
    }
}


export const editprofile=async (req ,res)=>{
    try {
        let {name}=req.body
        let image;
        if(req.file){
            image= await uploadoncloudinary(req.file.path)
        }
        let user=await User.findByIdAndUpdate(req.userid,{
            name,
            image,
        },{new:true})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        return res.status(200).json(user)
        
    } catch (error) {
         return res.status(400).json({message:'profile error'})
    }
}

 export const getotherusers=async (req,res)=>{
    try {
        
        let users=await User.find({
            _id:{$ne:req.userid}
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message:`get other users error ${error}`})
        
    }
 }