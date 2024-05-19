'use client';
import { X } from "lucide-react";
import { useState } from "react";

interface Product {
    number: number;
    name: string;
    quantity: number;
    mid_price: number;
    description: string;
    safety_level: number;
    avg_revenue: number;
  }
  const products: Product[] = [
          {
            "number": 1,
            "name": "Elio 5L Olive Oil",
            "quantity": 30000,
            "mid_price": 650.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 10000,
            "avg_revenue": 49.00
          },
          {
            "number": 2,
            "name": "Elio 2L Olive Oil",
            "quantity": 36000,
            "mid_price": 270.00,
            "description": "High-quality oil from the first cold pressing of olives. Store in a cool, dark place at 14-21°C with low humidity, tightly sealed",
            "safety_level": 14000,
            "avg_revenue": 102.00
            
          },
          {
            "number": 3,
            "name": "Skor 5kg Granulated Sugar",
            "quantity": 27000,
            "mid_price": 90.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 2000,
            "avg_revenue": 59.00
            
          },
          
          {
            "number": 4,
            "name": "Skor 2kg Granulated Sugar",
            "quantity": 30000,
            "mid_price": 180.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 2000,
            "avg_revenue": 70.00
            
          },
          {
            "number": 5,
            "name": "Skor 1kg Granulated Sugar",
            "quantity": 34000,
            "mid_price": 90.00,
            "description": "Pure, refined sugar crystals, perfect for baking and sweetening. Store in a cool, dry place at 10-21°C with low humidity, tightly sealed.",
            "safety_level": 1900,
            "avg_revenue": 100.00
            
          },
  ];
export const Table = () => {
    const [showModal, setShowModal] = useState(false);
    const [ModalInfo, setModalInfo] = useState({name:'', descreption:''})
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleOpenModal = (name: string, description: string) => {
      setModalInfo({name:name, descreption:description})
      setShowModal(true);
    };
    return(
    <div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
    <div className="flex p-6 flex-col space-y-2 items-center justify-center text-5xl">
      <h3 className="font-semibold leading-none tracking-tight">Cevital Group</h3>
      <p className="text-sm text-gray-500">Products</p>
    </div>
    <div className="p-6 pt-0">
      
  <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm [&_*]:border-gray-700">
        <thead className="[&_tr]:border-b [&_th]:border-r-2 ">
          <tr className=" border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 ">
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Product</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Quantity</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Mid Price</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Descreption</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 ">Safety level</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500  ">Avg revenue</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
        {products.map((productItem, index)=>{
            return(<tr key={productItem.number + productItem.name} className="border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100">
            <td className="p-4 align-middle border-r-2 ">{productItem.number}</td>
            <td className="p-4 align-middle  border-r-2">{productItem.name}</td>
            <td className="p-4 align-middle border-r-2">{productItem.quantity}</td>
            <td className="p-4 align-middle border-r-2">{productItem.mid_price}</td>
            <td className="p-4 align-middle  border-r-2"><button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>handleOpenModal(productItem.name,productItem.description)}>view Desc</button></td>
            <td className="p-4 align-middle border-r-2">{productItem.safety_level}</td>
            <td className="p-4 align-middle border-r-2">{productItem.avg_revenue}</td>
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