
import http from "http"

import express from "express"
import {Server} from "socket.io"

let app = express()

const server=http.createServer(app)
const io=new Server(server, {
    cors:{
        origin:"http://localhost:5173"
    }
})

export const usersocketmap={}

export const getreceiversocketid=(receiver)=>{
    return usersocketmap[receiver]
}

io.on("connection", (socket)=>{
    const userid=socket.handshake.query.userid
    if(userid !=undefined){
        usersocketmap[userid]=socket.id

        // console.log(userid)
    }
    io.emit("getonlineusers", Object.keys(usersocketmap))
    socket.on("disconnect", ()=>{
        delete usersocketmap[userid]
        io.emit("getonlineusers", Object.keys(usersocketmap))
    })

    // console.log(socket.id)
    // io.emit("hello","hello rishikesh")

    
})

export {app , server, io}