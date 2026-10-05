

import React from 'react'
import Sidebar from '../component/Sidebar'
import Messagearea from '../component/Messagearea'
import getmessages from '../customehook/getmessages'
 

function Home() {

  getmessages()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden '>
       
        <Sidebar/>
        <Messagearea/>
         
         
      
    </div>
  )
}

export default Home
