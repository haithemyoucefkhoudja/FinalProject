'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { Session } from "next-auth";

export default async function get_Products(){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    const path = 'p/get_available_products';
    const AvailiableProductsURL = getURL(path); // Construct the URL
    
    const response = await fetch(AvailiableProductsURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            company_name:session.user.company,
         }) 
    });
    const res_data = await response.json(); 
    if (!res_data.success) {
        throw new Error(res_data.message); 
    }
    console.log(res_data.products)
    return {success:true, products:res_data.products, type:'success'}
    }
    catch(error:any) {
            return {success:false, message:error.message || 'Something wrong happened', type:'error'} 
    }
}