/*export default function Popup_table_PSS(props:any) {
function handleClick(){
  props.send();
}
let warehouse_names_data = [
  "Warehouse A", "Warehouse B", "Warehouse C", "Warehouse D", "Warehouse E",
  "Warehouse F", "Warehouse G", "Warehouse H", "Warehouse I", "Warehouse J",
  "Warehouse K", "Warehouse L", "Warehouse M", "Warehouse N", "Warehouse O",
  "Warehouse P", "Warehouse Q", "Warehouse R", "Warehouse S", "Warehouse T"
];

let prices_data = [
  100, 120, 90, 150, 110,
  95, 130, 85, 145, 115,
  105, 125, 88, 155, 112,
  98, 128, 92, 152, 108
];

let safety_stocks_data = [
  "false", "true", "false", "true", "false",
  "true", "false", "true", "false", "true",
  "false", "true", "false", "true", "false",
  "true", "false", "true", "false", "true"
];
  const warehouse_names = warehouse_names_data.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))
  const prices = prices_data.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))
  const safety_stocks = safety_stocks_data.map((item, index) => (
  <p className="ml-[0.5rem]text-[1em] block w-full" key={index}>{item}</p>
))

   return (  
    <>
    <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="overflow-y-scroll w-[40vw] h-[40vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
      <div className=" w-[100%] h-[100%] p-[2rem]">
          <div className="black-border border flex">
              <div className="black-border border w-[40%]"><p className="m-[0.2rem]">Warehouses</p></div>
              <div className="black-border border w-[20%]"><p className="m-[0.2rem]">Prices</p></div>
              <div className="black-border border w-[40%]"><p className="m-[0.2rem]">Safety stocks</p></div>
          </div>

          <div className=" flex min-h-[85%] mb-[0.5rem]">
              <div className="black-border border w-[40%] h-[100%] border-t-0">{warehouse_names}</div>
              <div className="black-border border w-[20%] h-[100%] border-t-0">{prices}</div>
              <div className="black-border border w-[40%] h-[100%] border-t-0">{safety_stocks}</div>
          </div>
      </div>
     




    </div>
    </>
    )
}*/
import { X } from "lucide-react"
import { useState } from "react"
import dynamic from 'next/dynamic';

export default  function  Popup_table_PSS(props:any) {

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
              <div className="flex justify-center">{props.price} | {props.safety_level}</div>
           
            </div>
          </div>
        </div>
        
    )

}
