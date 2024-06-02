"use server";
import { getURL } from "@/lib/backend_baseurl";

export default async function deleteWarehouse(company_name:string, warehouse_name:string){
    //insert user in backend
    try {
        //  Get Deletion URL
        const URL = getURL('p/delete_warehouse');
        
        // Send POST Request with Credentials
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({company_name:company_name, warehouse_name:warehouse_name}) 
        });
        const res_data = await response.json(); 
        if (!res_data.success) {
            throw new Error(res_data.message); 
        }
        return {message:res_data.message, success:res_data.success};
    }
    catch(error:any)
    {
        return {"error":error.message} 
    }
}