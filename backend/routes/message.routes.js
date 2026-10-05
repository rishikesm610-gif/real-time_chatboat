


import express from "express"
 
import isauth from "../middleware/isauth.js"
import { upload } from "../middleware/multer.js"
import { getmessage, sendmessage } from "../controller/message.controller.js"
 

const messageRouter=express.Router()

 
messageRouter.post("/send/:receiver", isauth, upload.single("image") , sendmessage)
messageRouter.get("/get/:receiver", isauth  , getmessage)

export default messageRouter