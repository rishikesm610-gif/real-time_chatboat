import gettoken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const signUp=async (req,res)=>{
    try {
        const {username, email, password}=req.body
        const checkuserbyusername=await User.findOne({username})
        if(checkuserbyusername){
            return res.status(400).json({message:"username is allready exist"})
        }
        const checkuserbyemail=await User.findOne({email})
        if(checkuserbyemail){
            return res.status(400).json({message:"email is allready exist"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password  must be greater than 6"})
        }
        const hashpassword=await bcrypt.hash(password, 10)
        const user=await User.create({
            username, email, password:hashpassword
        })
        const token= await gettoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:"false"
        })
        return res.status(201).json(user)
        
    } catch (error) {
        res.status(500).json({message:`signup error ${error}` })
    }


}


export const login=async (req,res)=>{
   

    try {

        const {  email, password}=req.body
        //  

        const existuser=await User.findOne({email})
        if(!existuser){
            return res.status(400).json({message:"user not exist"})
        }
       let ismatch=await bcrypt.compare(password, existuser.password)
       if(!ismatch){
         return res.status(400).json({message:"incorrect passowrd"})
       }

        const token= await gettoken(existuser._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:"false"
        })
        return res.status(200).json(existuser)
        
    } catch (error) {
        res.status(500).json({message:`login error ${error}` })
    }

}

export const logout=async (req, res)=>{
    try {
        res.clearCookie("token")
         res.status(200).json({message:"logout easily" })
    } catch (error) {
         res.status(500).json({message:`logout error ${error}` })
    }
}