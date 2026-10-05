
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp1.png"
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { setotheruserdata, setselecteduser, setuserdata } from '../redux/userslice';
import { serverUrl } from '../main';



function Sidebar() {

    let {userdata , otherusers, selecteduser }=useSelector(state=>state.user)
    let [search, setsearch]=useState(false)
    let navigate=useNavigate()
    
    
    const image = useRef(null)
    let dispatch=useDispatch()

    const handlelogout=async ()=>{
    try {
         
        let result= await axios.get(`${serverUrl}/api/logout`,{withCredentials:true})
        dispatch(setuserdata(null))
        dispatch(setotheruserdata(null))
        navigate("/login")
        
    } catch (error) {
        console.log(error)
    }
}

  return (


    <div  className={`w-full lg:w-[30%] h-[100vh] bg-orange-300
                ${selecteduser ? "hidden lg:block" : "block"}`}>
            <div  className='w-[45px] h-[45px] rounded-full border-white bg-white flex justify-center items-center
             fixed bottom-[20px] left-[20px]  overflow-hidden cursor-pointer' onClick={handlelogout}  >
                       <AiOutlineLogout />
                    </div> 

        <div className='w-full h-[200px] bg-blue-400 rounded-b-[30%]   flex flex-col justify-center    px-[20px]
       shadow-gray-200 shadow-lg ' >
        <h1 className=''>
            Chetly
        </h1>
        <div className='w-full flex justify-between items-center'>
            <h1>Hii, {userdata.name}</h1>
            <div  className='w-[50px] h-[50px] rounded-full  flex justify-center items-center overflow-hidden cursor-pointer' 
                onClick={()=>navigate("/profile")}  >
                <img src={userdata.image || dp} alt="" className='h-[100%]'/>               
            </div>
        </div>

        <div className='flex w-full items-center gap-[10px]'>

                {!search && <div  className='w-[45px] h-[45px] rounded-full border-white bg-white flex justify-center items-center 
                    overflow-hidden cursor-pointer'onClick={()=>setsearch(true)} >
                        <IoIosSearch />
                    </div> }                    
                {search && <form className='w-full h-[50px] bg-white flex items-center rounded-xl px-3'>
                    <IoIosSearch className='text-[25px]' />
                    <input
                        type="text"
                        placeholder='search people...'
                        className='outline-none border-0 w-full h-full rounded-xl px-2'
                    />
                    <RxCross2 className='text-[25px]' onClick={()=>setsearch(false)}/>
                </form>}

                
            { !search && otherusers?.map((user)=>(
                      <div  className='w-[50px] h-[50px] rounded-full  flex justify-center items-center overflow-hidden cursor-pointer' 
                            onClick={()=>image.current.click()}  >
                            <img src={user.image || dp} alt="" className='h-[100%]'/>               
                     </div>
                ))}

        </div>    

        </div>    

               <div className='w-full h-full overflow-auto gap-[20px] flex flex-col mt-[15px] items-center' >
                    {otherusers?.map((user)=>(

                    <div className='w-[95%] h-[full] flex justify-start items-center bg-white rounded-full gap-[15px] cursor-pointer' 
                      onClick={()=>dispatch(setselecteduser(user))}>

                         <div  className='w-[50px] h-[50px] rounded-full  flex justify-center items-center overflow-hidden cursor-pointer' 
                            onClick={()=>image.current.click()}  >
                            <img src={user.image || dp} alt="" className='h-[100%]'/>    
                                     
                     </div>
                       <h1>{user.name || user.username}</h1>
                    </div>

                     
                     
                     ))}
                </div>

    </div>
  )
}

export default Sidebar
