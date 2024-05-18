import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup_form_edit_company from './popup_form_edit_warehouse.tsx'
import { useState } from 'react'
export default function warehouse_info_card() {
    const [pop,setPop]=useState(false)
    let boolean = 2;
    let warehouse_name = "highway 7 storage";
    let long=12.7;
    let lat=17.9;
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
				<FontAwesomeIcon icon={faPenToSquare} icon={faPenToSquare} onClick={()=>{setPop(true)}}/>
			</div>
                            {pop && <Popup_form_edit_company send={()=>{setPop(false)}}/>}

        </div>
    );
  }