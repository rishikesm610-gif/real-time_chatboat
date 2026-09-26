import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setuserdata } from '../redux/userslice'

function Signup() {
  let navigate=useNavigate()
  let [username, setusername]=useState("");
   let [email, setemail]=useState("");
    let [password, setpassword]=useState("");
    let [loading ,setloading]=useState(false)
    let dispatch=useDispatch()
    // let {userData}=useSelector(state=>state.user)
    // console.log(userData)

 // const handlesignup = async (e) => {
//   e.preventDefault();

//   // 1. Client-side check to prevent sending empty values
//   if (!username.trim() || !email.trim() || !password.trim()) {
//     console.error("Validation Error: All fields are required.");
//     return;
//   }

//   const payload = { username, email, password };
//   console.log("Sending payload to backend:", payload);

//   try {
//     const result = await axios.post(
//       `${serverUrl}/api/signup`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       }
//     );
//     console.log("Success:", result.data);
//     setusername("")
//      setemail("")
//       setpassword("")
//     // navigate("/login");
//   } catch (error) {
//     // 2. Log the EXACT error message sent back by your backend
//     if (error.response) {
//       console.error("Backend 400 Error Details:", error.response.data);
//     } else {
//       console.error("Network/Server Error:", error.message);
//     }
//   }
// };


const handlesignup = async (e) => {
  e.preventDefault();
  setloading(true)
  try {
    const result = await axios.post(
      `${serverUrl}/api/signup`,
      {
        username,
        email,
        password
      },
      {
        withCredentials: true
      }
    );
    // console.log(result.data);

    dispatch(setuserdata(result.data))

    setusername("")
    setemail("")
    setpassword("")
    setloading(false)
    //  navigate("/login");

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
      <form action="" className='w-full gap-[20px] flex justify-center items-center flex-col' onSubmit={handlesignup}>
      <input type="text" placeholder='username' className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl 
       shadow-gray-200 shadow-lg' value={username} onChange={(e)=>setusername(e.target.value)} />
      <input type="email"  placeholder='email' className='w-[90%] h-[50px] border-2 border-[orange] rounded-xl'
      value={email} onChange={(e)=>setemail(e.target.value)} />

 
      <input type="password"  placeholder='password' className='w-[90%] h-[50px] border-2 border-[orange] 
       rounded-xl 'value={password} onChange={(e)=>setpassword(e.target.value)} />
       
      
      <button className='w-[200px] h-[40px] bg-[#cb5cb8] rounded-xl font-semibold'>{loading?"Loading...":"Signup"}</button>
      <p  onClick={()=>navigate("/login")} className='cursor-pointer'>All ready have an account?
         <span className='text-blue-500 cursor-pointer'>Login</span></p>
    </form>
    </div>
    
      
    </div>

     
  )
}

export default Signup
