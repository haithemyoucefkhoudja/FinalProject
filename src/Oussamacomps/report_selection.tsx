'use client'
import { useState } from 'react'




export default function Home() {
  const [forState,setForState]=useState(1)
  const [typeState,setTypeState]=useState(1)
  const handleDataFromFor=(arg)=>{
    console.log("for",arg)
    setForState(arg)
  }
  const handleDataFromType=(arg)=>{
    console.log("type",arg)
    setTypeState(arg)
  }
 const selected={
    color:'blue',
    backgroundColor:'rgba(0,0,255,0.1)',
    border:'1px solid blue',
  }
  const norm={
    color:'grey'
  }
    const style1=forState==1 ? selected: norm;
    const style2=forState==2 ? selected: norm;

    const style3=typeState==1 ? selected: norm;
    const style4=typeState==2 ? selected: norm;
    const style5=typeState==3 ? selected: norm;
   
  return(
  <main className="flex justify-center items-center h-screen  ">
  <div className=" relative w-[27vw] h-[30vh] border border-black rounded-md  flex justify-evenly items-top pt-[1rem]">
            <button className="absolute left-[50%] bottom-[5%] pr-[2rem] p-[0.5rem] pl-[2rem] bg-blue-500 text-white rounded-[0.75em] text-[0.85em] transform -translate-x-1/2">Select</button>

    <div className="w-[40%] h-[70%]  rounded-md flex justify-evenly flex-col text-2xl">
        <p>report for :</p>
        <p>report type :</p>
    </div>


    <div className="  relative w-[50%] h-[70%]  rounded-md flex justify-evenly flex-col">
         <div className="flex flex-row relative">
         <div style={style1} onClick={() => handleDataFromFor(1)} className="w-[10vw] h-[4vh] border border-black  rounded-full rounded-r-lg flex justify-center items-center"
         >Sales</div>
         <div style={style2} onClick={() => handleDataFromFor(2)} className="w-[10vw] h-[4vh] border border-black rounded-full rounded-l-lg flex justify-center items-center "
         >Products</div>
         </div>

         <div className="flex flex-row relative">
         <div style={style3} onClick={() => handleDataFromType(1)} className="w-[10vw] h-[4vh] border border-black  rounded-full rounded-r-lg flex justify-center items-center"
         >Daily</div>
         <div style={style4} onClick={() => handleDataFromType(2)} className="w-[10vw] h-[4vh] border border-black  flex justify-center items-center "
         >Yearly</div>
         <div style={style5} onClick={() => handleDataFromType(3)} className="w-[10vw] h-[4vh] border border-black rounded-full rounded-l-lg flex justify-center items-center "
         >Monthly</div>
         </div>

     


    </div>

  


  </div>
  </main>
  );
}