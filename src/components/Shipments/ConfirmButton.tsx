'use client';

import { useSession } from "next-auth/react";
import { Loading } from "../ui/buttonLoading";
import { useEffect, useState } from "react";
import update_shipment_status from "@/actions/changeShipmentstatus";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X } from "lucide-react";

interface IComplete {
    updateShipment: (d_id:number) => void
    id:number;
}
export const CompleteButton:React.FC<IComplete> = ({updateShipment, id})=>{
    const {data, status} = useSession()
    const [permitted, setPermitted] = useState(false)
    const [Confirmation, setConfirmation] = useState(false)
    const [showDeletion, setshowDeletion] = useState(false);
    const [company, setCompany] = useState<string | null>(null);

    const router = useRouter()
    useEffect(()=>{
        if(!Confirmation)
            return;
        
        async function LocaldeleteAccount() {
            if(!company)
                return;
            console.log('hAKJDFSJAK;HD;KAD')
            const BackData = await update_shipment_status(id, company, 'complete')
            if(!BackData.success)
            {
                toast.error(BackData.error, {duration:3000});
                return;
            }
            toast.success(BackData.message, {duration:2000});
            setshowDeletion(false);
            router.refresh()

        }
        LocaldeleteAccount()

    },[Confirmation, company])
    useEffect(()=>{
        if(status !== 'authenticated')
            return;
        const permitted_roles = ['worker', 'driver']
        setCompany(data.user.company)
        if(permitted_roles.some(role => role === data.user.role))
            setPermitted(true)
    }, [data, status])
    return(
        <section>
             <button 
                onClick={()=>setshowDeletion(true)}
                className="h-10 px-4 py-2 w-24 bg-blue-700 text-gray-50 hover:bg-blue-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors  disabled:opacity-50 disabled:pointer-events-none" disabled={!permitted}  type="button">
                    <Loading text="Complete" isLoading={status === 'loading'}/>
                </button>
                {showDeletion && 
                
                <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
                <div className="fixed inset-0 flex  items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md ">
                    <button
                      onClick={()=> {setshowDeletion(false)}}
                      className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X></X>
                    </button>
                    <div className="flex justify-center">
                    <button onClick={()=>setConfirmation(true)} className="h-10 px-4 py-2 w-32 bg-blue-700 text-gray-50 hover:bg-blue-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"   type="button">
                        Confirm Operation
                    </button>
                    </div>
                    </div>
                    </div>
                    </div>
                        }
        </section>
        
    )
}
