"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { ProductUpdatedProps } from '@/types/ProductType';
import Popup_text_description from '@/Oussamacomps/popup_text_description';
import Popup_table_PSS from '@/Oussamacomps/popup_table_PSS';
import EditProduct from '../Popups/edit_product';

interface Props extends ProductUpdatedProps{
  updateData:({product}:{ product: ProductUpdatedProps})=>void;

}
export default function ProductInfoCard(props:Props) {
  const FakeData = {
        product_name:props.product_name,
        product_desc:props.product_desc,
        price:props.price,
        safety_level:props.safety_level,
        product_id:props.product_id
    };
const [pop,setPop]=useState(false)
const [descState,setDescState]=useState(false)
const [pricesState,setPricesState]=useState(false)



  return (
    <div className="">
      <div className="w-[35vw] h-[20vh] border border-black rounded flex justify-evenly items-center flex-col text-[1em]  text-black relative">
        <div className=" flex justify-center"><p className="mr-[1rem]">Product name:</p> <p>{FakeData.product_name}</p></div>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setDescState(true)}} 
        >Description</button>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setPricesState(true)}}
        >Prices & safety stock</button>
        {descState && <Popup_text_description {...FakeData}  send={()=>{setDescState(false)}}  />} 
        {pricesState && <Popup_table_PSS {...FakeData} send={()=>{setPricesState(false)}}     />}
        {pop && <EditProduct {...FakeData} send={() => { setPop(false); } } updateData={props.updateData}/>}

        <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
        
        <FontAwesomeIcon icon={faTrashCan} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
      </div>
      </div>
    </div>
     
  )
}

