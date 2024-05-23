export default function Popup_form_edit_warehouse (props:any){
function handleClick(){
	
  props.send();
}
return (
		<>
	 <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="flex justify-center z-50 items-center text-black w-[40vw] h-[40vh] rounded-[1rem] p-[1rem] border black-border  absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
  
      		<p className="absolute left-[37%] top-[5%]  h-[50%] ">Edit warehouse</p>
      		<div className="flex flex-col justify-between h-[40%] ">
      	    	<div className=" flex w-[110%] justify-between"><p>Warehouse Name</p><input type="text" className=" bg-white border black-border rounded outline-none"/></div>
      	    	<div className=" flex w-[110%] justify-between"><p>Warehouse Type</p><input type="text" className=" bg-white border black-border rounded outline-none"/></div>
      	    	<div className=" flex w-[71%] justify-between"><p>Location</p><button className="p-[0.5rem] text-[0.85em]  bg-white border black-border rounded-md outline-none">Mapping</button></div>
      		</div>
     
      <button className="absolute right-[4%] bottom-[4%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">Apply</button>
    </div>
     
</>
)
}