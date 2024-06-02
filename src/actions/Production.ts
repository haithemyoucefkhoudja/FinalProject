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
    warehouse_name: string;
    products:{
        name: string;
        quantity: number;
    }[]; 
}
export default async function production(values: BackEndProps){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'admin')
        throw new Error("you don't have permission to perform this action");
    const path = 'p/production';
    const ProductionURL = getURL(path); // Construct the URL
    const BackendProducts = values.products.map(product => ({
        product_name: product.name,
        product_quantity: product.quantity
      }));   
    const response = await fetch(ProductionURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            warehouse_name:values.warehouse_name,
            products:BackendProducts,
            company_name:session.user.company,
            role:session.user.role,
            user_id:session.user.id,
         }) 
    });
    const res_data = await response.json(); 
    console.log(res_data)
    if (!res_data.success) {
        throw new Error(res_data.error); 
    }

    return {success:true, message:res_data.message, type:'success'}
    }
    catch(error:any) {
            return {success:false,"error":error.message, type:'error'} 
    }
}