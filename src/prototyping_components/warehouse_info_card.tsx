'use client';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Popup_form_edit_company from './popup_form_edit_warehouse.tsx' //delete
import {  useState } from 'react'
import { EditWarehouse } from "@/components/Management/Popups/edit_warehouse.tsx";
import { WarehouseType } from "@/types/Data.ts";

type Props={
    warehouse_name:string;
    long:number;
    lat:number;
    type:WarehouseType;
    id:number;
    updateData:({ware_data, mode}:{mode:'Creation'|'Edit', ware_data: UpdatedProps})=>void;
    
}
type UpdatedProps={
    warehouse_name: string;
    warehouse_Long: number;
    warehouse_Lat: number;
    warehouse_type: WarehouseType;
    warehouse_own_id: number;
}
export default function warehouse_info_card(props:Props) {
    const Data = {
        warehouse_name:props.warehouse_name,
        warehouse_Long:props.long,
        warehouse_Lat:props.lat,
        warehouse_type:props.type,
        warehouse_own_id:props.id
    };
    const [pop,setPop]=useState(false) //delete this
    
    return (
        <div className="w-[35vw] h-[20vh] border border-black rounded flex  items-center text-[1em] relative">
            <div className="ml-[1rem]">
            	<span className="flex"><p className="underline">{Data.warehouse_type}</p><p>: {Data.warehouse_name}</p></span>
            	<p>Coordinates:</p>
            	<p>{Data.warehouse_Long}</p>
            	<p>{Data.warehouse_Lat}</p>
            </div>
            <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}} /*and change this*//>
			</div>
            {pop && <EditWarehouse {...Data} send={()=>{setPop(false)}} updateData={ props.updateData}/> } 

        </div>
    );
  }