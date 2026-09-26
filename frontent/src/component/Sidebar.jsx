
import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp1.png"
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";


function Sidebar() {

    let {userdata , otherusers }=useSelector(state=>state.user)
    let [search, setsearch]=useState(false)
const handlelogout=async()=>{
    try {
        
    } catch (error) {
        
    }
}

  return (


    <div className='lg:w-[30%] w-full h-full bg-[#d39d39]'>

            <div  className='w-[45px] h-[45px] rounded-full border-white bg-white flex justify-center items-center
             fixed bottom-[20px] left-[20px]  overflow-hidden cursor-pointer'onClick={()=>setsearch(true)} >
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
                onClick={()=>image.current.click()}  >
                <img src={userdata.image || dp} alt="" className='h-[100%]'/>               
            </div>
        </div>

        <div className='flex w-full items-center gap-[10px]'>

                {!search && <div  className='w-[45px] h-[45px] rounded-full border-white bg-white flex justify-center items-center 
                    overflow-hidden cursor-pointer'onClick={()=>setsearch(true)} >
                        <IoIosSearch />
                    </div> }                    
                {search &&
                <form className='w-full h-[50px] bg-white flex items-center rounded-xl px-3'>
                    <IoIosSearch className='text-[25px]' />
                    <input
                        type="text"
                        placeholder='search people...'
                        className='outline-none border-0 w-full h-full rounded-xl px-2'
                    />
                    <RxCross2 className='text-[25px]' onClick={()=>setsearch(false)}/>
                </form>}
                {otherusers?.map((user)=>(
                      <div  className='w-[50px] h-[50px] rounded-full  flex justify-center items-center overflow-hidden cursor-pointer' 
                            onClick={()=>image.current.click()}  >
                            <img src={user.image || dp} alt="" className='h-[100%]'/>               
                     </div>
                ))}
        </div>

    
        
        </div>

      
    </div>
  )
}

export default Sidebar
