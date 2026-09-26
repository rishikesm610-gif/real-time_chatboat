import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import getcurrentUser from './customehook/getcurrentuser'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import getotherUsers from './customehook/getotherusers'
 

function App() {
  getcurrentUser()
  getotherUsers()
  let {userdata}=useSelector(state => state.user)


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
