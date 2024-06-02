"use server";
import { getURL } from "@/lib/backend_baseurl";

export default async function update_shipment_status(shipment_id:number, company_name:string, operation:'cancel' | 'complete'){
    
    //insert user in backend
    try {
        //  Get Deletion URL
        const URL = getURL('p/update_shipment_status');
        // Send POST Request with Credentials
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({shipment_id, company_name, operation}) 
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