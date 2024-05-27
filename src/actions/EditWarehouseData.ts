'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { WarehouseType } from "@/types/Data";
import { Session } from "next-auth";

interface BackEndProps { 
    warehouse_own_id: number;
    warehouse_name: string;
    warehouse_type: WarehouseType;
    warehouse_longitude: number;
    warehouse_latitude: number; 
}
export default async function editWarehouse(values: BackEndProps, mode:'Creation' | 'Edit'){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'admin')
        throw new Error("you don't have enough permission for this action");
    const path = mode == 'Creation' ? 'p/create_warehouse' : 'p/edit_warehouse';
    const WarehouseURL = getURL(path); // Construct the URL

    // Send POST Request with Credentials
    const response = await fetch(WarehouseURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            ...values,
            company_name:session.user.company
         }) 
    });
    const res_data = await response.json(); 
    
    if (!res_data.success) {
        throw new Error(res_data.message); 
    }
    // fetch from api...
    if(res_data.warehouse_id)   
        return {success:true, message:res_data.message, extra_data:{
            warehouse_id:res_data.warehouse_id, 
            warehouse_longitude:res_data.warehouse_longitude,
            warehouse_latitude:res_data.warehouse_latitude
        }}
    return {success:true, message:res_data.message}
    }
    catch(error:any)
        {
            return {success:false,"error":error.message} 
        }
}