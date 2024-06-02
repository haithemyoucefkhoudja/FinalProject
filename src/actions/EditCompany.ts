'use server'
/*
{
  'company_name': "CEVITAL",
  'new_company_name' : "Cevital Group"
}
*/
import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { Session } from "next-auth";

interface BackEndProps { 
        company_name: string,
        new_company_name : string
}
export default async function EditComapny(values: BackEndProps){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    if(session.user.role !== 'admin')
        throw new Error("you don't have enough permission for this action");
    console.log('Edit Company:',values);
    const path = 'p/edit_company';
    const DistributionURL = getURL(path); // Construct the URL
    const response = await fetch(DistributionURL, {
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

    return {success:true, message:res_data.message}
    }
    catch(error:any) {
            return {success:false,error:error.message} 
    }
}