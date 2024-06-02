'use server';
import { getURL } from "@/lib/backend_baseurl";
import { Session, User } from "next-auth";

 type CheckChangesResponse = {
  message: string;
  change: boolean;
  deleted: boolean;
};

export type TokenRefreshResponse = {
  warehouse_name: string;
  company_name: string;
  role: string;
};

export const checkChanges = async (props:{user_id: number,warehouse_name:string, company_name:string, role:string}): Promise<CheckChangesResponse> => {
    const path = 'p/check_changes';    
    const ChangesURL = getURL(path); // Construct the URL
    const response = await fetch(ChangesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  });
  if (!response.ok) {
    throw new Error('Failed to check changes');
  }
  return response.json();
};

const refreshToken = async (props:{userId: number,warehouse_name:string, company_name:string}): Promise<TokenRefreshResponse> => {
    const path = 'p/token_refresh';    
    const RefreshURL = getURL(path); // Construct the URL
    const response = await fetch(RefreshURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: props.userId, warehouse_name:props.warehouse_name, company_name:props.company_name }),
  });
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  return response.json();
};

const handleUserChanges = async (user:User) => {
  try {
    const changesResponse = await checkChanges({user_id:user.id, company_name:user.company, warehouse_name:user.warehouse, role:user.role});
    console.log(changesResponse)
    // add deletion with signout logic
    if (changesResponse.change || changesResponse.deleted) {
      const newData = await refreshToken({userId:user.id, company_name:user.company, warehouse_name:user.warehouse});
      return({newData:newData, changesResponse:changesResponse})
    } else {
        return null;
    }
  } catch (error) {
    return {error:'something wrong happened'};
  }
};

export default handleUserChanges;
