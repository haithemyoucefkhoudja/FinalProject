

import { useState } from 'react'
import Popup_form_shipment_products from "./popup_form_shipment_products.tsx"
export default function Popup_form_create_shipment(props:any){
function handleClick(){  
  props.send();
}
    const [pop,setPop]=useState(false)

const product_names_data = ["From","To","Driver","Vehicule"];
let product_names= product_names_data.map(function (item,index){
return(
 <div className=" w-[80%] flex justify-between mb-[1rem]"> 
 <p className="w-[40%]  ">{item}</p><input type="text" className="w-[60%] bg-white border black-border rounded outline-none"/>
 </div>)})
return (
    <>
   <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className=" text-[1.5rem] flex flex-col justify-center items-center text-black w-[40vw] h-[55vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
          
          
          <div className="flex flex-col justify-between w-[70%] h-[70%]">
            {product_names}{/* all these should be a dropdown, but since we haven't made up our mind I'll leave it as is for now*/}
          <div className="flex w-[65%] justify-between ">  <p>Products</p><button className="p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em] " onClick={()=>{setPop(true)}}>Choose products</button></div>
          </div>
     
      <button className="absolute right-[4%] bottom-[4%] pl-[2rem] pr-[2rem] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">Sell</button>
    </div>
  {pop && <Popup_form_shipment_products send={()=>{setPop(false)}}/>}
</>
)
}