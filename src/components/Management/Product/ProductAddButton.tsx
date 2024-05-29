'use client';
import {useState } from "react";
import { ProductUpdatedProps } from "@/types/ProductType";

interface ICancel {
    updateWarehouses: ({product}:{product: ProductUpdatedProps}) => void
    product_id:number;
}
export const AddButton:React.FC<ICancel> = ({updateWarehouses, product_id})=>{
    const [showForm, setShowForm] = useState(false)
    const fakeData:ProductUpdatedProps = {
        product_name:'',
        price:-1,
        safety_level:-1,
        product_desc:'',
        product_id:product_id
    }
    return(
        <>
        		   <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded" 
                onClick={()=>setShowForm(true)}>Add product</button>

            
            {/*showForm && <EditProduct {...fakeData} send={()=>{setShowForm(false)}} updateData={updateWarehouses} /> */} 
        </>  
    )
}
