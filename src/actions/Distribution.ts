'use server';
/*
{
  'company_name': "CEVITAL",
  'warehouse_name' : "Bejaia",
  'role': "worker",
  'user_id' : 4,
  
  'warehouse_id' : 1,
  'products': [
    {
      'product_id':
      'product_quantity': 10
    }
  ]
  
}
*/
import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { Session } from "next-auth";

interface BackEndProps { 
    warehouse_id: number;
    products:{
        name: string;
        quantity: number;
    }[]; 
}
export default async function distribution(values: BackEndProps){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'worker')
        throw new Error("you don't have permission to perform this action");
    const path = 'p/distribution';
    const DistributionURL = getURL(path); // Construct the URL
    const BackendProducts = values.products.map(product => ({
        product_name: product.name,
        product_quantity: product.quantity
      }));    // Send POST Request with Credentials
    const response = await fetch(DistributionURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            ...values,
            products:BackendProducts,
            company_name:session.user.company,
            role:session.user.role,
            user_id:session.user.id,
            warehouse_name:session.user.warehouse
         }) 
    });
    const res_data = await response.json(); 
    if (!res_data.success) {
        throw new Error(res_data.error); 
    }

    return {success:true, message:res_data.message, type:'success'}
    }
    catch(error:any) {
            return {success:false,"error":error.message, type:'error'} 
    }
}