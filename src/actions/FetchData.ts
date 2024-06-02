'use server';
import { getURL } from "@/lib/backend_baseurl";
import { Data } from "@/types/Data";
import { Session } from "next-auth";

export default async function FetchAllData(session:Session){
  try{
  
  const path = 'p/get_all_json_data_for_three_consumer';
  const DistributionURL = getURL(path); // Construct the URL

  const response = await fetch(DistributionURL, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        user_id:session.user.id,
        company:session.user.company,
        warehouse_name:session.user.warehouse,
        role:session.user.role
      }) 
  });
  const res_data = await response.json(); 
  if (res_data.reponse) {
      return null
  }
  const WareData:Data = res_data
  
  return(WareData)}
  catch(error)
  {
    return null;
  }
}