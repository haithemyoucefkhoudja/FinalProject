'use server';

import { getServerSession } from "@/app/utils/getServerSession";
import { getURL } from "@/lib/backend_baseurl";
import { ProductInfo } from "@/types/Data";
import { Session } from "next-auth";

/*
{
  "products": [
    {
      "id": 1,
      "name": "ELIO 5L",
      "data_per_warehouse":[
        {
          "warehouse_id": 1,
          "warehouse_name": "Factory Bajaia N1",
          "price": 150,
          "safety_level": 2300
        }
      ]
    }
  ]
}
*/
export default async function get_ProductsInfo(){
    try{
    const session:Session | null = await getServerSession();
    if(!session || !session.user)
        throw new Error("you are not authenticated");
    
    if(session.user.role !== 'admin')
        throw new Error("you don't have permission to perform this action");

    const path = 'p/get_products_info_cards';
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
    const products:ProductInfo[] = res_data.products
    return {success:true, products:products, type:'success'}
    }
    catch(error:any) {
            return {success:false, message:error.message || 'Something wrong happened', type:'error'} 
    }
}