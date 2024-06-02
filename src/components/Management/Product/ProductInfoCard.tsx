"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import Popup_text_description from '@/Oussamacomps/popup_text_description';
import Popup_table_PSS from '@/Oussamacomps/popup_table_PSS';
import EditProduct from '../Popups/edit_product';
import { ProductInfo } from '@/types/Data';

interface Props extends ProductInfo{

}
export default function ProductInfoCard(props:Props) {
  const RealData = {
        id:props.id,
        name:props.name,
        description:props.description,
        product_id:props.id,
        data_per_warehouse:props.data_per_warehouse
    };
const [pop,setPop]=useState(false)
const [descState,setDescState]=useState(false)
const [pricesState,setPricesState]=useState(false)

  return (
    <div className="">
      <div className="w-[35vw] h-[20vh] border border-black rounded flex justify-evenly items-center flex-col text-[1em]  text-black relative">
        <div className=" flex justify-center"><p className="mr-[1rem]">Product name:</p> <p>{RealData.name}</p></div>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setDescState(true)}} 
        >Description</button>
        <button className="w-[45%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]"
        onClick={()=>{setPricesState(true)}}
        >Prices & safety stock</button>
        {descState && <Popup_text_description descreption={props.description}  send={()=>{setDescState(false)}}  />} 
        {pricesState && <Popup_table_PSS data={RealData.data_per_warehouse} send={()=>{setPricesState(false)}}     />}
        {pop && <EditProduct {...RealData} send={() => { setPop(false); } } />}

        <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
        
        <FontAwesomeIcon icon={faTrashCan} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
      </div>
      </div>
    </div>
     
  )
}

