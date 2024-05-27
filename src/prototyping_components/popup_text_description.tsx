

/*export default function Popup_text_description(props:any) {
function handleClick(){
  props.send();
}
  return (  
    <>
    <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="overflow-y-scroll w-[30vw] h-[60vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="absolute top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
      <p >Description:</p>
      <p className="whitespace-normal m-[0.5em] text-[0.80em]">{props.text}</p>
    </div>
    </>
    )
}*/

import { X } from "lucide-react"
import { useState } from "react"
import dynamic from 'next/dynamic';

export default  function  Popup_text_description (props:any) {

    return(
        <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
          <div className="fixed inset-0 flex  items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md">
              <button
                onClick={()=> {
                    props.send()}}
                className=" text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X></X>
              </button>
              
           
            </div>
          </div>
        </div>
        
    )

}

