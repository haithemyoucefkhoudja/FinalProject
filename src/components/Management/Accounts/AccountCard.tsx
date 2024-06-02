'use client';
import { AccountInfo } from "@/types/Data";
import { Pen, Trash, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { EditAccount } from "./PopUp";
import { Session } from "next-auth";
import deleteAccount from "@/actions/deleteAccount";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AccountCard = ({ account, session }:{account:AccountInfo, session:Session}) => {
    const [showForm, setShowForm] = useState(false);
    const [Confirmation, setConfirmation] = useState(false)
    const [showDeletion, setshowDeletion] = useState(false);
    const router = useRouter()
    useEffect(()=>{
        if(!Confirmation)
            return;
        async function LocaldeleteAccount() {
            const data = await deleteAccount(account.id, account.name)
            if(!data.success)
            {
                toast.error(data.error, {duration:3000});
                return;
            }
            toast.success(data.message, {duration:2000});
            setshowDeletion(false)
            router.refresh()
        }
        LocaldeleteAccount()

    },[Confirmation])

    return (
			<div className="flex w-[80vh] overflow-hidden shadow-lg rounded-md shadow-gray-800 p-4 m-4 bg-white">
				<User className=" flex-shrink-0 border-2 border-green-400 rounded-full h-12 w-12"/>
				<div className=" items-start   px-5 flex-shrink-0">
					<p className="text-gray-700 text-base"><strong>ID:</strong> {account.id}</p>
					<p className="text-gray-700 text-base"><strong>Name:</strong> {account.name}</p>
					<p className="text-gray-700 text-base"><strong>Warehouse:</strong> {account.warehouse}</p>
					<p className="text-gray-700 text-base"><strong>Role:</strong> {account.role}</p>
                    <p className="text-gray-700 text-base"><strong>Email:</strong> {account.email}</p>
				</div>
				<div className="  justify-end space-x-1 flex w-full items-end">
					<button  className="ml-auto h-8 w-8 border border-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " onClick={()=>setshowDeletion(true)}>
						<Trash className="h-4 w-4"></Trash>
					</button>
					<button  className="ml-auto h-8 w-8 border border-gray-500 bg-white hover:bg-gray-100 hover:text-gray-900 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " onClick={()=>setShowForm(true)}>
						<Pen className="h-4 w-4"></Pen>
					</button>
				</div>
				{showForm && 
                <EditAccount session={session} {...account} send={()=>setShowForm(false)}></EditAccount>
                }
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
            <button onClick={()=>setConfirmation(true)} className="h-10 px-4 py-2 w-32 bg-red-700 text-gray-50 hover:bg-red-700/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"   type="button">
                Confirm Deletion
            </button>
            </div>
            </div>
            </div>
            </div>
                }
			</div>
    );
};