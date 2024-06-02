'use server';

import { getURL } from "@/lib/backend_baseurl";
import { AccountInfo } from "@/types/Data";

export default async function get_Accounts(role:string, company_name:string){
    try{
    
    if(role !== 'admin')
        throw new Error("you don't have permission to perform this action");

    const path = 'p/get_accounts_info_cards';
    const AvailiableAccounts = getURL(path); // Construct the URL
    
    const response = await fetch(AvailiableAccounts, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            company_name:company_name,
         }) 
    });
    const res_data = await response.json(); 
    if (!res_data.success) {
        throw new Error(res_data.message); 
    }
    const Accounts:AccountInfo[] = res_data.accounts
    return {success:true, accounts:Accounts, type:'success'}
    }
    catch(error:any) {
            return {success:false, message:error.message || 'Something wrong happened', type:'error'} 
    }
}