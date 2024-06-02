'use client';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {  useEffect, useState } from 'react'
import { EditWarehouse } from "@/components/Management/Popups/edit_warehouse.tsx";
import { WarehouseType } from "@/types/Data.ts";
import { UpdatedProps } from "@/types/WarehouseType";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Session } from "next-auth";
import deleteWarehouse from "@/actions/deleteWarehouse";

type Props={
    warehouse_name:string;
    long:number;
    lat:number;
    type:WarehouseType;
    id:number;
    session:Session
    
}
export default function WarehouseInfoCard(props:Props) {
    const [Confirmation, setConfirmation] = useState(false)
    const [showDeletion, setshowDeletion] = useState(false);
    const router = useRouter()
    useEffect(()=>{
        if(!Confirmation)
            return;
        async function LocaldeleteAccount() {
            const data = await deleteWarehouse(props.session.user.company, props.warehouse_name)
            if(!data.success)
            {
                toast.error(data.error, {duration:3000});
                return;
            }
            toast.success(data.message, {duration:2000});
            setshowDeletion(false);
            router.refresh()

        }
        LocaldeleteAccount()

    },[Confirmation])
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
                <p>{Data.warehouse_own_id}</p>
            	<span className="flex"><p className="underline">{Data.warehouse_type}</p><p>: {Data.warehouse_name}</p></span>
            	<p>Coordinates:</p>
            	<p>{Data.warehouse_Long}</p>
            	<p>{Data.warehouse_Lat}</p>
            </div>
            <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan}  onClick={()=>setshowDeletion(true)}/>
				<FontAwesomeIcon icon={faPenToSquare} onClick={()=>{setPop(true)}} /*and change this*//>
			</div>
            {pop && <EditWarehouse {...Data} send={()=>{setPop(false)}} /> } 
            {showDeletion && 
                
                <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
                <div className="fixed inset-0 flex  items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md ">
                    <button
                      onClick={()=> {setshowDeletion(false)}}
                      className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X></X>
                    </button>
                    <div className="flex justify-center">
                    <button onClick={()=>setConfirmation(true)} className="h-10 px-4 py-2 w-32 bg-red-700 text-gray-50 hover:bg-red-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"   type="button">
                        Confirm Deletion
                    </button>
                    </div>
                    </div>
                    </div>
                    </div>
                        }
        </div>
    );
  }