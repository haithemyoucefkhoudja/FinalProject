"use server";
import { getURL } from "@/lib/backend_baseurl";
import { RegisterFormSchema } from "@/schemas/Form";
import { z } from "zod";

export default async function signUp(values:z.infer<typeof RegisterFormSchema>){
    //insert user in backend
    try {
        //  Get Registration URL
        const registerURL = getURL('p/registeration'); // Construct the URL for the login endpoint
        
        // Send POST Request with Credentials
        const response = await fetch(registerURL, {
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
        // Extract and Return User Data and return the user object if found, otherwise return null
        const user = res_data.data.user; 
        return user || null;
    }
    catch(error:any)
    {
        return {"error":error.message} 
    }
}