'use client'

import Form from './Form.tsx'
import Toggle from './toggle.tsx'
import { useState } from 'react'
import Dropdown from './dropdown.tsx'
export default function Home() {
  const [forState,setForState]=useState(1)
  const [typeState,setTypeState]=useState(1)
  const handleDataFromFor=(data)=>{
    setForState(data)
  }
  const handleDataFromType=(data)=>{
    setTypeState(data)
  }
  const turn_off = {
  textDecoration: 'line-through',
  color: 'grey',
};
 const norm ={

 }
  const style_switch= forState==1 ?  turn_off: norm; 
  
  return(
  <main className="flex justify-center items-center h-screen  ">
  <div className=" w-[27vw] h-[38vh] border border-black rounded-md  flex justify-evenly items-center">
    <div className="w-[40%] h-[90%]  border-black rounded-md flex justify-evenly flex-col text-2xl">
        <p>report for :</p>
        <p style={style_switch}>warehouse :</p>
        <p>report type :</p>
        { typeState==1? <p>year</p> : <p>month</p>}
    </div>


    <div className="w-[50%] h-[90%]  rounded-md flex justify-evenly flex-col">
        <Toggle first="company" second="warehouse" selection={forState} setForState={handleDataFromFor} setTypeState={handleDataFromFor}/>
        { forState==0 ? <Dropdown/> : <div className="border border-black rounded-md h-[3vh] z-[1] relative bg-gray-300 border border-gray-500" > </div>}
        <Toggle first="yearly" second="monthly" selection={typeState} setTypeState={handleDataFromType} setForState={handleDataFromType}/>
        <Dropdown/> 
    </div>
  </div>
  </main>
  );
}
