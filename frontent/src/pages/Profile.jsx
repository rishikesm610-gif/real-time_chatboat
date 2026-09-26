

import React from 'react'
import dp from "../assets/dp1.png"
import { useDispatch, useSelector } from 'react-redux'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { serverUrl } from '../main';
import { setuserdata } from '../redux/userslice';
import axios from 'axios';

function Profile() {

    let {userdata}=useSelector(state=>state.user)
    let navigate=useNavigate()
    let [name, setname]=useState(userdata.name||"")
    let [frontendimage, setfrontendimage]=useState(userdata.image || dp)
    let [backendimage, setbackendimage]=useState(null)
    let dispatch=useDispatch()
    let [saving, setsaving]=useState(false)

    let image=useRef()
    const handleimage=(e)=>{
      let file=e.target.files[0]
      setbackendimage(file)
      setfrontendimage(URL.createObjectURL(file))
    }
  // const handleprofile=async (e)=>{
  //   e.preventDefault()
  //   setsaving(true)
  //   try {
      
  //     let formdata= new FormData()
  //     formdata,append("name", name)
  //     if(backendimage){
  //       formdata.append("image",backendimage)
  //     }

  //     let result=await axios.put(`${serverUrl}/api/profile`,formdata,{withCredentials: true})
  //     dispatch(setuserdata(result.data))
  //     setsaving(false)
  //   } catch (error) {
  //     console.log(error)
  //     setsaving(false)
  //   }
  // }
const handleprofile = async (e) => {
    e.preventDefault();
    setsaving(true);

    try {
        const formdata = new FormData();

        formdata.append("name", name);

        if (backendimage) {
            formdata.append("image", backendimage);
        }

        const result = await axios.put(
            `${serverUrl}/api/user/profile`,
            formdata,
            {
                withCredentials: true
            }
        );

      //  console.log("UPDATED USER:", result.data);

        dispatch(setuserdata(result.data));

        setsaving(false);

    } catch (error) {
        console.log("PROFILE ERROR:", error.response?.data || error);
        setsaving(false);
    }
};
  return (
    
    <div className='w-full h-[100vh] bg-[#6f6f88] flex justify-center items-center flex-col gap-[20px]'>
        <div className='fixed top-[20px] left-[25px] text-[30px] cursor-pointer' onClick={()=>navigate("/")}>
            <FaLongArrowAltLeft />
        </div>       
        <div className='w-[150px] h-[150px] rounded-full border-[black] bg-slate-50 overflow-hidden cursor-pointer' 
        onClick={()=>image.current.click()}  >
            <img src={frontendimage} alt="" className='h-[100%]'/>

        </div>
       <form className='w-[500px] gap-[20px] flex justify-center items-center flex-col' onSubmit={handleprofile}>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleimage} />
        <input type="text" placeholder='Entre your name' className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl'
          onChange={(e)=>setname(e.target.value)} value={name}/>
        <input type="text" readOnly className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl' value={userdata.username}/>
        <input type="email" readOnly className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl' value={userdata.email}/>
        <button className='w-[200px] h-[40px] bg-[#cb5cb8] rounded-xl font-semibold' 
          disabled={saving}>{saving?"saving...":"Save profile"}</button>

       </form >
       
    </div>
  )
}

export default Profile
