'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { Session } from "next-auth";

export default async function editWarehouse(values: { warehouse_own_id: number; warehouse_name: string; warehouse_type: "Factory" | "Warehouse"; warehouse_longitude: number; warehouse_latitude: number; }){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'admin')
        throw new Error("you don't have enough permission for this action");
    
    const editWarehouseURL = getURL('p/edit_warehouse'); // Construct the URL

    // Send POST Request with Values
    const response = await fetch(editWarehouseURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(values) 
    });
    const res_data = await response.json(); 
    
    if (!res_data.success) {
        throw new Error(res_data.message); 
    }
    // fetch from api...
    
    return {success:true, message:res_data.message}
    }
    catch(error:any)
        {
            return {success:false,"error":error.message} 
        }
}