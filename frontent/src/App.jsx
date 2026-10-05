import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import getcurrentUser from './customehook/getcurrentuser'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useDispatch, useSelector } from 'react-redux'
import getotherUsers from './customehook/getotherusers'
import {io} from "socket.io-client"
import { serverUrl } from './main'
import { FaHandshake } from 'react-icons/fa'
import { setonlineuser, setsocketuser } from './redux/userslice'
 
 

function App() {
  getcurrentUser()
  getotherUsers()
  let {userdata, socket, onlineuser}=useSelector(state => state.user)
  let dispatch=useDispatch()
  

  useEffect(()=>{

    if(userdata){
        const socket=io(`${serverUrl}`,{
              query:{
              userid:userdata?._id   
              }

            })
            dispatch(setsocketuser(socket))
            socket.on("getonlineusers",(users)=>{
              dispatch(setonlineuser(users))
            })
            return ()=>socket.close()

            socket.on("hello",(mess)=>{
              console.log(mess)
            
            })
    }
    else{
      if(socket){
        socket.close()
        dispatch(setsocketuser(null))
      }
    }
   

  },[userdata])


  return (
    <Routes>
      <Route path='/login' element={!userdata?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userdata?<Signup/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userdata?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userdata?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
