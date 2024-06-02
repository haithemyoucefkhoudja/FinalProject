"use server";
import { getURL } from "@/lib/backend_baseurl";

export default async function deleteAccount(id:number, account_original_username:string){
    //insert user in backend
    try {
        //  Get Deletion URL
        const URL = getURL('p/delete_account');
        
        // Send POST Request with Credentials
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify({account_id:id, username:account_original_username}) 
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