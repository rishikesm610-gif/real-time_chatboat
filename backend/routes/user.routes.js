
import express from "express"
import { editprofile, getcurrentuser, getotherusers,   } from "../controller/user.controller.js"
import isauth from "../middleware/isauth.js"
import { upload } from "../middleware/multer.js"
 

const userRouter=express.Router()

userRouter.get("/current", isauth, getcurrentuser)
userRouter.get("/others", isauth, getotherusers)
userRouter.put("/profile", isauth, upload.single("image") , editprofile)

export default userRouter