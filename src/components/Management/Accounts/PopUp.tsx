import { X } from "lucide-react"
import ManagementRegisterForm from "./CreateAccountForm";
import { AccountInfo } from "@/types/Data";
import { Session } from "next-auth";
interface EditAccount   extends AccountInfo{
  send: () => void;
  session:Session
}
export  const  EditAccount:React.FC<EditAccount> = (props: EditAccount ) =>  {
    return(
        <div className="fixed inset-0 z-40  bg-gray-900 bg-opacity-50">
          <div className="fixed inset-0 flex  items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md">
              <button
                onClick={()=> {
                    props.send()}}
                className=" text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X></X>
              </button>
              <ManagementRegisterForm {...props} updateShow={()=>props.send()} session={props.session}></ManagementRegisterForm>
            </div>
          </div>
        </div>
        
    )

}