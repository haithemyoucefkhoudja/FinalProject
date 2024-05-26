'use client';

import { useSession } from "next-auth/react";
import { Loading } from "../ui/buttonLoading";
import { useEffect, useState } from "react";

interface IComplete {
    updateShipment: (d_id:number) => void
    id:number;
}
export const CompleteButton:React.FC<IComplete> = ({updateShipment, id})=>{
    const {data, status} = useSession()
    const [permitted, setPermitted] = useState(false)
    useEffect(()=>{
        if(status !== 'authenticated')
            return;
        const permitted_roles = ['worker', 'driver']
        
        if(permitted_roles.some(role => role === data.user.role))
            setPermitted(true)


    }, [data, status])
    return(
             <button 
                onClick={()=>updateShipment(id)}
                className="h-10 px-4 py-2 w-24 bg-blue-700 text-gray-50 hover:bg-blue-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:opacity-50 disabled:pointer-events-none" disabled={!permitted}  type="button">
                    <Loading text="Complete" isLoading={status === 'loading'}/>
                </button>
        
    )
}
