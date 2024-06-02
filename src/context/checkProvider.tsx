"use client";
import handleUserChanges from '@/actions/check';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState,  ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';



export const CheckDataProvider = ({ children }: { children: ReactNode }) => { 
    const {data, update, status} = useSession()
    const [sessionData, setSessionData] = useState<Session|null>(null);
    const router = useRouter()
  // useEffect hook to fetch data
  useEffect(()=>{
    if(sessionData)
        {
            toast.success(`DATA:
            id:${sessionData.user.id}
            company:${sessionData.user.company}
            warehouse:${sessionData.user.warehouse}
            role:${sessionData.user.role}
            `, {duration:3000})
    
            router.refresh()
        }
},[sessionData])
  useEffect(() => {
    
    if(status == 'authenticated' && !sessionData)
        {

    const fetchData = async () => {
        const response = await handleUserChanges(data?.user);
        if(response?.error)
            {
                toast.error('something Wrong happened', {duration:3000})
            }
        if(!response)
            {
              setSessionData(data)
              return;
            }
        if(response.changesResponse?.deleted)
          {
            signOut()
          }
        if (response?.newData) {
            
            const updated_data = await update({
                update:
                {company:response.newData?.company_name,
                warehouse:response.newData?.warehouse_name,
                role:response.newData?.role as "admin" | "observer" | "driver" | "worker"
               }})
            setSessionData(updated_data)
        }

    };
    
    fetchData();
}
  }, [status, sessionData, data, update]); 

  return (
    <section>
        {sessionData && children}
    </section>
  );
}
