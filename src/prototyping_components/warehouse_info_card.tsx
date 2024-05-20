'use client';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup_form_edit_company from './popup_form_edit_warehouse.tsx' //delete
import { useState } from 'react'

type Props={
    warehouse_name:string;
    long:number;
    lat:number;
    boolean:number;
}

export default function warehouse_info_card(props:Props) {

    const [pop,setPop]=useState(false) //delete this
    let boolean = props.boolean;
    let warehouse_name = props.warehouse_name;
    let long=props.long;
    let lat=props.lat;
    return (
        <div className="w-[35vw] h-[20vh] border border-black rounded flex justify-center items-center text-[1.5em] relative">
            <div>
            	<span className="flex"><p className="underline">{boolean === 1 ? "Factory" : "Warehouse"}</p><p>: {warehouse_name}</p></span>
            	<p>Coordinates:</p>
            	<p>{long}</p>
            	<p>{lat}</p>
            </div>
            <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} icon={faPenToSquare} onClick={()=>{setPop(true)}} /*and change this*//>
			</div>
                            {pop && <Popup_form_edit_company send={()=>{setPop(false)}}/> /*and this*/} 

        </div>
    );
  }