'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { Session } from "next-auth";

interface BackEndProps { 
    warehouse_id: number;
}
export default async function get_DistributionLimit(values: BackEndProps){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'worker')
        throw new Error("you don't have permission to perform this action");
    const path = 'p/get_distribution_limit';
    const DistributionLimitURL = getURL(path); // Construct the URL
    
    const response = await fetch(DistributionLimitURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            ...values,
            company_name:session.user.company,
            role:session.user.role,
            user_id:session.user.id,
            warehouse_name:session.user.warehouse
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