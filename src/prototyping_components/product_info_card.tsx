import { useState } from 'react'
import Popup_text_description from "./popup_text_description.tsx"
import Popup_table_PSS from "./popup_table_PSS.tsx"

type Props={
  product_name:string;
}


function Product_info_card(props:Props) {
const [descState,setDescState]=useState(false)
const [pricesState,setPricesState]=useState(false)



  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="w-[25vw] h-[20vh] border border-black rounded flex  items-center flex-col text-[1.5em]  text-black">
        <div className="mt-[1rem] flex justify-center"><p className="mr-[1rem]">Product name:</p> <p>{props.product_name}</p></div>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white m-[0.5rem] rounded text-[0.85em]"
        onClick={()=>{setDescState(true)}} 
        >Description</button>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setPricesState(true)}}
        >Prices & safety stock</button>
        {descState && <Popup_text_description send={()=>{setDescState(false)}}/>}
        {pricesState && <Popup_table_PSS send={()=>{setPricesState(false)}}/>}
      </div>
    </div>
    
  )
}

export default Product_info_card
