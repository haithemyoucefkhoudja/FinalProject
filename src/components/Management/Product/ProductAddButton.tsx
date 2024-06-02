'use client';
import {useState } from "react";
import {  } from "@/types/ProductType";
import EditProduct from "../Popups/edit_product";
import { DataPerWarehouse, ProductInfo, Warehouse } from "@/types/Data";
interface WareListProps {
    Products:ProductInfo[];
    warehouses:Warehouse[];
}
export const AddButton:React.FC<WareListProps> = ({Products,warehouses})=>{
    const [showForm, setShowForm] = useState(false)
    const fakeData:ProductInfo = {
        name:'',
        description:'',
        id:-1,
        data_per_warehouse:warehouses.map(w=>({
            warehouse_id: w.id,
            warehouse_name: w.name,
            price: 0,
            safety_level: 0,
        })) as DataPerWarehouse[]
    }
    return(
        <>
        		   <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded" 
                onClick={()=>setShowForm(true)}>Add product</button>

            
            {showForm && <EditProduct {...fakeData} send={()=>{setShowForm(false)}}  /> } 
        </>  
    )
}
