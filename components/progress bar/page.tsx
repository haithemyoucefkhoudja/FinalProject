'use client'


import { useState } from 'react'
export default function Home() {
  const [progress,setProgress]=useState(70)

  const progressBarStyle = {
    width: `${progress}%` // Set the width based on the progress state
  };
   const handleInputChange = (event) => {
    setProgress(event.target.value)
    
  };
  return(
  <>
  <div className="flex justify-center items-center h-screen test flex-col">
    <input type="text" onChange={handleInputChange} placeholder="this is for testing purposes"/>
    <div className="flex items-center progress-bar-outer">  
      <div className="progress-bar-inner" style={progressBarStyle}>
      </div>
    </div>
  </div>
  </>
  );
}

