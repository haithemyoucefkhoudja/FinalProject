'use client';
import {useState } from "react";
import { UpdatedProps } from "@/types/WarehouseType";
import { EditWarehouse } from "../Popups/edit_warehouse";

interface ICancel {
    warehouse_own_id:number;
}
export const AddButton:React.FC<ICancel> = ({warehouse_own_id})=>{
    const [showForm, setShowForm] = useState(false)
    const fakeData:UpdatedProps = {
        warehouse_name:'',
        warehouse_Long:7,
        warehouse_Lat:35,
        warehouse_type:'Warehouse',
        warehouse_own_id:warehouse_own_id
    }
    return(
        <>
            <button 
                onClick={()=>setShowForm(true)}
                className="mt-[2vh] bg-blue-500 w-[12vw] p-[0.5rem] text-white rounded">Add warehouse or Factory
            </button>
            
            {showForm && <EditWarehouse {...fakeData} send={()=>{setShowForm(false)}} /> } 
        </>  
    )
}
