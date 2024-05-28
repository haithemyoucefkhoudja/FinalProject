'use client'

import Form from './Form.tsx'
import { useState } from 'react'
export default function Home() {
  const [trigger,setTrigger]=useState(false)
  return (
    <div className="flex justify-center items-center align-items h-screen">
    <button onClick={()=>{setTrigger(true)}}>Click to popup form</button>
    {trigger && <Form send={()=>{setTrigger(false)}}/>}
    </div>
  );
}

