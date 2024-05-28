'use client'
import './globals.css';

import { useState } from 'react'
export default function Home() {
  const [progress,setProgress]=useState(70)

  const progressBarStyle = {
    width: `${progress}%` // Set the width based on the progress state
  };
   const handleInputChange = (event: any) => {
    setProgress(event.target.value)
    
  };
  return(
  <>
  <div className="flex justify-center items-center h-screen test flex-col">
    <input type="text" onChange={handleInputChange} placeholder="this is for testing purposes"/>
    <div className="flex items-center w-[30vw] h-[5vh] border-[2px] border-black rounded-[1rem] relative overflow-hidden">  
      <div className="h-[80%] width-[30%] m-[1vh] rounded-[0.7rem] bg-gradient-to-br from-green-600 to-indigo-800 " style={progressBarStyle}>
      </div>
    </div>
  </div>
  <p>test</p>
  </>
  );
}

