
import React, { useRef, useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import dp from "../assets/dp1.png"
import { useDispatch, useSelector } from 'react-redux';
import { setselecteduser } from '../redux/userslice';
import { MdEmojiEmotions } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import Sendmessage from './Sendmessage';
import Receivemessage from './Receivemessage';
import axios from 'axios';
import { serverUrl } from '../main';
import { addmessage, setmessages } from '../redux/messageslice';
import { useEffect } from 'react';
 

function Messagearea() {
  

const { selecteduser, userdata, socket } = useSelector(state => state.user);
let dispatch=useDispatch()
let [showpicker, setshowpicker]=useState(false)
let [input, setinput]=useState("")
let [frontentimage, setfrontentimage]=useState(null)
let [backendimage, setbackendimage]=useState(null)
let image=useRef()
let {messages}=useSelector(state=>state.message)

const handleimage = (e)=>{
  let file=e.target.files[0];
  setbackendimage(file)
  setfrontentimage(URL.createObjectURL(file))

}

const handlesendmessage = async (e) => {
    e.preventDefault();
    if(input.length==0 && backendimage==null)
      return ;

    try {
        const formdata = new FormData();

        formdata.append("message", input);

        if (backendimage) {
            formdata.append("image", backendimage);
        }

        console.log("Before API");

        const result = await axios.post(
            `${serverUrl}/api/message/send/${selecteduser._id}`,
            formdata,
            {
                withCredentials: true
            }
        );

        // console.log("API SUCCESS");
        console.log(result.data);

        dispatch(setmessages([
    ...(Array.isArray(messages) ? messages : []),
    result.data
]));
        setinput("")
        setbackendimage(null)
        setfrontentimage(null)

    } catch (error) {
       console.log(error)
    }
};



const onemojiclick=(emojidata)=>{
  setinput(previnput=>previnput+emojidata.emoji)
  setshowpicker(false)
}
// useEffect(()=>{
// socket.on("newmessage",(mess)=>{
//   dispatch(setmessages([...messages, mess]))
// })
// return ()=>socket.off("newmessage")
// },[messages, setmessages])

useEffect(() => {

    if (!socket) return;

    const handleNewMessage = (mess) => {
        console.log("🔥 NEW MESSAGE:", mess);
        dispatch(addmessage(mess));
    };

    socket.on("newmessage", handleNewMessage);

    return () => {
        socket.off("newmessage", handleNewMessage);
    };

}, [socket, dispatch]);



  return (
    <div  className={`w-full lg:w-[70%] h-[100vh] bg-orange-200
                ${selecteduser ? "block" : "hidden lg:block"}`}>

      {
         
        selecteduser && 
        <div>

            <div className='w-full h-[80px] bg-blue-300 rounded-b-[30px]  flex  items-center gap-[15px]  px-[20px]
            shadow-gray-200 shadow-lg ' >
                  <div className='   cursor-pointer' onClick={()=>dispatch(setselecteduser(null))} >
                      <FaLongArrowAltLeft className=''/>
                  </div>
                  <div  className='w-[50px] h-[50px] rounded-full  flex justify-center items-center overflow-hidden cursor-pointer' >
                        <img src={ selecteduser?.image || dp} alt="" className='h-[100%]'/>               
                  </div>
                  <h1>{selecteduser?.name || "user"}</h1>          
            
            </div>
            <div className='w-full h-[500px] bg-blue-200 py-[15px] px-[15px] overflow-auto'>

              {showpicker && 
              <div className='absolute bottom-[100px]  '>
                <EmojiPicker width={300} height={350}  onEmojiClick={onemojiclick} className='z-[100]' />
              </div>
               }

              { messages?.map((mess)=>(
                mess.sender==userdata._id?<Sendmessage image={mess.image} message={mess.message}/>:<Receivemessage 
                image={mess.image} message={mess.message}/>
              ))} 
               
               {/* <Sendmessage/>
               <Receivemessage/>
               <Sendmessage/> */}
            </div>
        </div>        
      }      
         {
          !selecteduser && 
          <div className='w-full h-full flex flex-col justify-center items-center' >
            <h1>Welcome to chat</h1>
            <span>Chat Friendly !</span>
          </div>
          }
          {
            selecteduser && 
            
            <div className='w-full h-[100px] lg:w-[70%] fixed bottom-[20px] flex justify-center items-center '>

              <img src={frontentimage} alt="" className='w-[100px] h-[100px] absolute right-[20%]
               bottom-[80px] rounded-lg outline-none focus:outline-none select-none'
/>

                  <form   className='w-[95%] max-w-[80%] h-[60px] bg-slate-600 rounded-full flex items-center gap-[15px] px-[15px]'
                  onSubmit={handlesendmessage}>
                    <div className='cursor-pointer' onClick={()=>setshowpicker(prev=>!prev)}>
                      <MdEmojiEmotions />
                    </div>
                    <input type="file" accept='image/*' ref={image} hidden onChange={handleimage}/>
                    <input type="text" placeholder='enter message..' className='w-full h-full outline-none border-0  ' 
                    onChange={(e)=>setinput(e.target.value)} value={input}  />
                    <div onClick={()=>image.current.click()} >
                      <CiImageOn />
                    </div>

                    {input.length>0 || backendimage!==null && ( <button>
                      <IoSend className='cursor-pointer' />
                    </button>)}
                    
                     
                      

                  </form>
             </div>
          }

      
       
    </div>
  )
}

export default Messagearea
 