'use client'

import { X } from "lucide-react"
import {  useState } from "react"
import PaginationForm from "./DPForm/PaginationForm"
import { useSession } from "next-auth/react"
import { Loading } from "../ui/buttonLoading"
import { DistributionForm } from "./DPForm/DistributionForm"
import { Session } from "next-auth"
import { Warehouse } from "@/types/Data"

export const TablesButton:React.FC<{session:Session, Warehouses: Warehouse[]}> = ({session, Warehouses}) =>{
    const [showForm, setShowForm] = useState(false)
    const Text = session.user.role == 'admin' ? 'Production': 'Distribution'
    const {status} = useSession()
    return(
        <>
    <div className="  sticky z-30 inset-0 w-100 flex ">
            <button onClick={()=>{setShowForm(true)}}  className="h-10 px-4 py-2 w-24 bg-gray-900 hover:bg-gray-900/90 text-gray-50   inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors shadow-xl shadow-gray-900/50 disabled:bg-gray-900/50 disabled:pointer-events-none" disabled={status == 'loading'}>
                <Loading isLoading={status == 'loading'} text={Text}></Loading>
            </button>
    </div>
    {showForm &&
        <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
            <div className="fixed inset-0 flex  items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-md p-6 w-3/4 max-w-md">
                    <button
                    onClick={()=> {setShowForm(false)}}
                    className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                    <X className="h-6 w-6"></X>
                    </button>
                    {session.user.role === 'admin'  ?  (<PaginationForm Warehouses={Warehouses}></PaginationForm>): (<DistributionForm updateShow={()=> {setShowForm(false)}} Warehouses={Warehouses}></DistributionForm>)}
                    
                </div>
            </div>
    </div>
    }
    </>
    )
}