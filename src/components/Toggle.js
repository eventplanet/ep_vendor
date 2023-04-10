import React, { useState } from 'react'
const Toggle = () => {
    const [status, setstatus] = useState(true)
  return (
   <>
 {
     status?<h1>Hello world</h1>:null
 } 
     <button onClick={(e)=>setstatus(!status)}>{status ?'hide':'show'}</button>
   </>
  )
}
export default Toggle
