'use client'


import { useState, useEffect } from 'react';
export default function Home(props:any) {
  const [progress,setProgress]=useState(props.progress)
  
  let progressBarStyle = {
    width: `${progress}` // Set the width based on the progress state
  };



  return(
  <>
    
    <div className="flex items-center w-[85%] h-[100%] border-2 border-black rounded-[1rem] relative overflow-hidden">  
      <div className="h-[80%] w-[0%] m-[0.5rem] rounded-[0.7rem] bg-gradient-to-br from-green-500 to-indigo-700" style={progressBarStyle}>
      
      </div>
    </div>
  </>
  );
}

