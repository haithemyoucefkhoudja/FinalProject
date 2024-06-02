'use client'
import {  useState } from "react"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import { Loading } from "@/components/ui/buttonLoading"
import { EditAccount } from "./PopUp"
interface Props{
    session:Session
} 
export const AddAccountButton:React.FC<Props> = (props) =>{
    const [showForm, setShowForm] = useState(false)
    const {status} = useSession()
    return(
        <>
    <div className="  sticky z-30 inset-0  flex ">
            <button onClick={()=>{setShowForm(true)}}  className="h-10 px-4 py-2 w-24 bg-gray-900 hover:bg-gray-900/90 text-gray-50   inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors shadow-xl shadow-gray-900/50 disabled:bg-gray-900/50 disabled:pointer-events-none" disabled={status == 'loading'}>
                <Loading isLoading={status == 'loading'} text={'Create'}></Loading>
            </button>
    </div>
    {showForm && <EditAccount email="" send={()=>setShowForm(false)} session={props.session} id={-1} name={""} warehouse={""} role={"observer"}></EditAccount>
    }
    </>
    )
}