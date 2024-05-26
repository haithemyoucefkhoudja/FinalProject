"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_text_description from "./popup_text_description.tsx"
import Popup_table_PSS from "./popup_table_PSS.tsx"
import Popup_form_edit_product from "./popup_form_edit_product.tsx"

type Props={
    product_name:string;

}

function Product_info_card(props:Props) {
  const [Data, setData] = useState<Props>({
        product_name:props.product_name,
        product_desc:props.product_desc,
        prices:props.prices,
        safety_stock:props.safety_stock,
    });
const [pop,setPop]=useState(false)
const [descState,setDescState]=useState(false)
const [pricesState,setPricesState]=useState(false)



  return (
    <div className="">
      <div className="w-[35vw] h-[20vh] border border-black rounded flex justify-evenly items-center flex-col text-[1em]  text-black relative">
        <div className=" flex justify-center"><p className="mr-[1rem]">Product name:</p> <p>{Data.product_name}</p></div>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setDescState(true)}} 
        >Description</button>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setPricesState(true)}}
        >Prices & safety stock</button>
        {descState && <Popup_text_description {...Data}  send={()=>{setDescState(false)}}  />} 
        {pricesState && <Popup_table_PSS {...Data} send={()=>{setPricesState(false)}}     />}
        {pop && <Popup_form_edit_product {...Data} send={()=>{setPop(false)}} updateData={(newData:UpdatedProps)=>{setData(newData)}}/>}

        <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
        
        <FontAwesomeIcon icon={faTrashCan} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
      </div>
      </div>
    </div>
     
  )
}

export default Product_info_card
