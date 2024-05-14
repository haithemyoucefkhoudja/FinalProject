


export default function Popup_form_edit_product(props){
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
  <input className="bg-white text-black black-border border ml-[0.5rem] h-[3.88vh] w-[90%] text-[1em] block w-full" key={index}/>
))
  const safety_stocks = safety_stocks_data.map((item, index) => (
  <input className="bg-white text-black black-border border ml-[0.5rem] h-[3.88vh] w-[90%] text-[1em] block w-full" key={index}/>
))
return(

<>
  <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    <div className="flex justify-center items-center text-black w-[40vw] h-[70vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
      <p className="absolute left-[37%] top-[5%]  h-[50%] ">Edit product</p>
      <div className="ml-[2rem] flex flex-col h-[80%] w-[100%] justify-center">
      	<div className="flex flex-col justify-between h-[1%] ">
      		<div className=" flex w-[75%] justify-between"><p>Product Name:</p><input type="text" className=" bg-white border black-border rounded outline-none"/></div>
      	</div>
      <div className=" h-[30%] w-[75%] black-border border mt-[3rem] mb-[1rem] ">
      	<div className=" w-[100%] h-[100%] black-border border-b-[1px] overflow-none">
        	<div className="flex">
            	<div className="black-border border w-[40%]"><p className="m-[0.2rem]">Warehouses</p></div>
              	<div className="black-border border w-[20%]"><p className="m-[0.2rem]">Prices</p></div>
              	<div className="black-border border w-[40%]"><p className="m-[0.2rem]">Safety stocks</p></div>
            </div>

            <div className=" overflow-y-scroll overflow-x-hidden flex h-[68%]  ">
              	<div className="black-border border h-fit flex flex-col w-[40%]  border-b-0 border-t-0">{warehouse_names}</div>
              	<div className="black-border border h-fit flex flex-col w-[20%]  border-b-0 border-t-0">{prices}</div>
              	<div className="black-border border h-fit flex flex-col w-[40%] border-b-0 border-r-0 border-t-0">{safety_stocks}</div>
            </div>
      	</div>  
      </div>
      <div className="h-[30%]">
      	<p>Description:</p>
      	<textarea className="bg-white text-black border border-black w-[90%] resize-none h-[100%]"/>
      </div>
   
    </div>
      <button className="absolute right-[4%] bottom-[4%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">Apply</button>
  </div>
</>



	)
}