import express from "express";
import dotenv from "dotenv";

import connectdb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js";

 

dotenv.config();
const port = process.env.PORT || 5000;
// const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)

// app.get("/",(req,res)=>{
//     res.send("server is running hello world");
// })

server.listen(port,async ()=>{

    connectdb();
    console.log("server started ");
})