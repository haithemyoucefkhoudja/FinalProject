'use client';

import { Session } from "next-auth";
import { useState } from "react";
import { EditWarehouse } from "./Popups/edit_warehouse";
import { WarehouseType } from "@/types/Data";
import { UpdatedProps } from "@/types/WarehouseType";

interface IAdd {
    updateWarehouse: (newData:UpdatedProps) => void
}

export const AddButton:React.FC<IAdd> = ({updateWarehouse})=>{
    const [showForm, setShowForm] = useState(false);
    const fake_data = {
        warehouse_name:'',
        warehouse_Long:-1,
        warehouse_Lat:-1,
        warehouse_type:"Warehouse" as WarehouseType,
        warehouse_own_id:-1
    }
    return(
        <>
            <button 
                onClick={()=>setShowForm(true)}
                className="mt-[2vh] bg-blue-500 w-[12vw] p-[0.5rem] text-white rounded">Add warehouse or factory
            </button>
            {showForm && <EditWarehouse {...fake_data} send={()=>{setShowForm(false)}} updateData={(newData:UpdatedProps)=>{updateWarehouse(newData)}} /> } 

        </>
    )
}
