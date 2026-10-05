
import jwt from "jsonwebtoken"
const isauth=async (req,res,next)=>{
    try {

        let token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token is not found"})
        }

        let verifytoken = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(verifytoken)
        req.userid=verifytoken.userid
        next()
        
    } catch (error) {
        return res.status(500).json({message:`isauth error ${error}`})
    }
}
export default isauth