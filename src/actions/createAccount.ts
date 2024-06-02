"use server";
import { getURL } from "@/lib/backend_baseurl";
import { RegisterFormSchema } from "@/schemas/Form";
import { z } from "zod";

export default async function signUp(values:z.infer<typeof RegisterFormSchema>, id:number, account_original_username:string){
    //insert user in backend
    try {
        //  Get Registration URL
        const URL = id == -1 ? getURL('p/create_account') : getURL('p/edit_account');
        let data = values;
        (data as any).account_id = id;
        if(id !== -1) {
                (data as any).original_username = account_original_username;
        }
        // Send POST Request with Credentials
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
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