
import React from 'react'
import dp from "../assets/dp.jpg"

function Sendmessage({image, message}) {
  return (
    <div className='w-fit  max-w-[300px] text-white px-[20px]  bg-slate-500 py-[5px] rounded-tr-none rounded-2xl 
    relative right-0 ml-auto'>

       {image &&  <img src={image} alt="" />}
      {message && <span>{message}</span> }
      
    </div>
  )
}

export default Sendmessage
