import { X } from "lucide-react"
import { useState } from "react"
import dynamic from 'next/dynamic';
import { Loading } from "@/components/ui/buttonLoading";
import { Input } from "@/components/ui/input";
export default  function  Popup_form_edit_truck (props:any) {

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
              <p className="text-center mb-[1rem] text-[1.25em]">Edit vehicle</p>
              <form>
                <span className="flex justify-between w-full  "><label>model</label><input placeholder={props.model} className=" mb-[1rem]   rounded-sm ring-2 ring-gray-200" type="text"/></span>
                <span className="flex justify-between w-full  "><label>plate</label><input placeholder={props.plate} className=" border border-black mb-[1rem]" /></span>
                <button className="h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 "   /*disabled={isSubmitting}*/ type="submit">
          <Loading text="Register" /*isLoading={isSubmitting}*//>

        </button>
              </form>

              
           
            </div>
          </div>
        </div>
        
    )

}