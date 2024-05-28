


export default function Popup_form_shipment_products(props:any){
function handleClick(){
  
  props.send();
}
const product_names_data = [
  { name: "lentils", available_stock: 12, forecast:64 },
  { name: "rice", available_stock: 26, forecast:68},
  { name: "flour", available_stock: 84, forecast:87},
  { name: "yeast", available_stock: 689, forecast:98},
  { name: "butter",available_stock: 213, forecast:56},
  { name: "milk", available_stock: 13, forecast:13},
  { name: "eggs", available_stock: 69, forecast:69}
];
let product_names= product_names_data.map(function (item,index){
return(
 <div className="w-[100%] flex justify-between mb-[1rem]"> 
 <p className="w-[40%]  ">product {index} {item.name}</p><input type="number" placeholder="0" className="w-[20%] bg-white border black-border rounded outline-none"/>
 <p className="w-[30%]  text-center">{item.available_stock}</p> 
 <p className="w-[30%]  text-center">{item.forecast}</p>
 </div>)})
return (
    <>
   <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="text-[1.5rem] flex flex-col justify-center items-center text-black w-[40vw] h-[40vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
          
          <p className="absolute left-[37%] top-[5%]  h-[50%] ">Producted products</p>
          <div className="flex w-[75%]  justify-end"><p className="mr-[1rem]">available stock</p><p className="">forecast</p></div>
          <div className="flex flex-col justify-between w-[90%] h-[50%] overflow-y-scroll">
            {product_names}{/* all these should be a dropdown, but since we haven't made up our mind I'll leave it as is for now*/}
          </div>
     
      <button className="absolute right-[4%] bottom-[4%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">apply</button>
    </div>
     
</>
)
}