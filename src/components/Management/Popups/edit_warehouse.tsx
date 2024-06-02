import { X } from "lucide-react"
import { WarehouseForm } from "../Form/WarehouseForm"
import {  useState } from "react"
import dynamic from 'next/dynamic';
import { WareDataProvider } from "@/context/WarehouseContext";
import { UpdatedProps } from "@/types/WarehouseType";
const CreateMap = dynamic(() => import('@/components/Map/CreateWareHouse'), {
  ssr: false,
});
interface EditWarehouse extends UpdatedProps {
  send: () => void;
}
export  const  EditWarehouse:React.FC<EditWarehouse> = (props: EditWarehouse ) =>  {
    const [showMap, setShowMap] = useState(false);
    function updateState( ) {
        setShowMap(prev => !prev);
    }
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
              
              <WareDataProvider warehouse_name={props.warehouse_name} warehouse_type={props.warehouse_type} warehouse_pos={[props.warehouse_Lat, props.warehouse_Long]}>
              { showMap ? 
              
              <CreateMap {...props} showMap={()=> {updateState()}}/>
              :
              <WarehouseForm {...props} showMap={()=> {updateState()}}></WarehouseForm>
              }
              </WareDataProvider>
            </div>
          </div>
        </div>
        
    )

}