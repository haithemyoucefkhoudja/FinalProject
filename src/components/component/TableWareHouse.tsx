'use client';
import { Product } from "@/types/Data";
import { X } from "lucide-react";
import { useState } from "react";

  
export const Table = ({products, WarehouseName}:{products:Product[], WarehouseName:string}) => {
    const [showModal, setShowModal] = useState(false);
    const [ModalInfo, setModalInfo] = useState({name:'', descreption:''})
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleOpenModal = (name: string, description: string) => {
      setModalInfo({name:name, descreption:description})
      setShowModal(true);
    };
  
    const colors:Record<string, string> = {
        'red': 'bg-red-200 p-4 align-middle border-r-2',
        'yellow': 'bg-yellow-200 p-4 align-middle border-r-2',
        'orange': 'bg-orange-300 p-4 align-middle border-r-2',
        'purple': 'bg-purple-200 p-4 align-middle border-r-2',
        'green': 'bg-green-300 p-4 align-middle border-r-2',
        'blue': 'bg-blue-200 p-4 align-middle border-r-2',
      };
    return(
    <div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
    <div className="flex p-6 flex-col space-y-2 items-center justify-center text-5xl">
      <h3 className="font-semibold leading-none tracking-tight">Cevital Group</h3>
      <p className="text-sm text-gray-500">{WarehouseName}</p>
    </div>
    <div className="p-6 pt-0">
      
  <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm [&_*]:border-gray-700">
        <thead className="[&_tr]:border-b [&_th]:border-r-2 ">
          <tr className=" border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 ">
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Product</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Quantity</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Descreption</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Safety level</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500  ">Price</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
        {products.map((productItem)=>{
            return(<tr key={productItem.id + productItem.name} className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className="p-4 align-middle border-r-2 ">{productItem.id}</td>
            <td className="p-4 align-middle  border-r-2">{productItem.name}</td>
            <td className={colors[productItem.color]}>{productItem.quantity}</td>
            <td className="p-4 align-middle  border-r-2"><button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>handleOpenModal(productItem.name,productItem.description)}>view Desc</button></td>
            <td className="p-4 align-middle border-r-2">{productItem.safety_level}</td>
            <td className="p-4 align-middle border-r-2">{productItem.price}</td>
          </tr>)
        })}
        </tbody>
      </table>
      </div>
      {showModal && (
        <>
        <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50`}>
        
      </div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-1/2 max-w-md">
            <button
              onClick={handleCloseModal}
              className=" text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X></X>
            </button>
            <h2 className="text-xl font-bold mb-4">{ModalInfo.name}</h2>
            <p className="text-gray-700">{ModalInfo.descreption}</p>
          </div>
        </div>
        </>
      )}
       
    </div>
  </div>)
}