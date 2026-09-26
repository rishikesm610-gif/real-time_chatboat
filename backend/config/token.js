import  jwt from "jsonwebtoken"


const gettoken=async (userid)=>{
    try {

        const token= jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn:"7d"})
        return token
        
    } catch (error) {
        console.log('gen token error')
    }
}
export default gettoken