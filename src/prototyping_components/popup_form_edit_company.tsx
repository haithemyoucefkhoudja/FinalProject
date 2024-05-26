import { X } from "lucide-react"
import { useState } from "react"
import dynamic from 'next/dynamic';

export default  function  Popup_form_edit_company (props:any) {

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