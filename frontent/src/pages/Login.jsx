import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setselecteduser, setuserdata } from '../redux/userslice';

function Login() {

  let navigate=useNavigate()
  
    let [email, setemail]=useState("");
    let [password, setpassword]=useState("");
    let dispatch=useDispatch()
     let [loading ,setloading]=useState(false)


    //let {userData}=useSelector(state=>state.user)
    // console.log(userData)


    const handlelogin = async (e) => {
    e.preventDefault();
    setloading(true)
  try {
    const result = await axios.post(
      `${serverUrl}/api/login`,
      {      
      email,
        password
      },
      {
        withCredentials: true
      }
    );
    // console.log(result.data);
     dispatch(setuserdata(result.data))
     dispatch(setselecteduser(null))
     setloading(false)
     
     navigate("/");

  } catch (error) {
    console.log(error );
    setloading(false)
  }
};

  return (
    <div className='w-full h-[100vh] bg-[#69c46b] flex justify-center items-center'>
    <div className='w-full max-w-[500px] h-[600px] bg-slate-100 rounded-xl flex flex-col gap-[10px] '>

      <div className='w-full h-[200px] bg-orange-400 rounded-b-[30%] rounded-t-xl flex justify-center items-center
       shadow-gray-200 shadow-lg'>
        <h1 className='text-[#6c6cb2] text-[20px] font-bold' >Welcome to 
          <span className='text-white font-bold'> Chetly</span></h1>
      </div>
      <form action="" className='w-full gap-[20px] flex justify-center items-center flex-col' onSubmit={handlelogin} 
       autoComplete="off" >
       
      <input type="email"  placeholder='email' className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl' 
      onChange={(e)=>setemail(e.target.value)} value={email}   autoComplete="off"
 />
      <input type="password"  placeholder='password' className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl'
        onChange={(e)=>setpassword(e.target.value)} value={password}   autoComplete="off"
 />
      <button className='w-[200px] h-[40px] bg-[#cb5cb8] rounded-xl font-semibold'>{loading?"Loading...":"Login"}</button>
      <p  onClick={()=>navigate("/signup")} className='cursor-pointer'>All ready have an account?
         <span className='text-blue-500 cursor-pointer'>Signup</span></p>
    </form>
    </div>
    
      
    </div>
  )
}

export default Login
