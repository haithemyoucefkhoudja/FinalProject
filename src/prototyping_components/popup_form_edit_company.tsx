


export default  function Popup_form_edit_company(props:any){
function handleClick(){
	
  props.send();
}
	return(
<>
	 <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className=" w-[40vw] h-[20vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
      <div className="absolute left-[30%] top-[20%] flex flex-col justify-between h-[50%] ">
      		<p>Edit Company</p>
      		<div className="flex"><p>Name:</p><input type="text" className="ml-[1rem] bg-white border black-border rounded outline-none"/></div>
      </div>
      <button className="absolute right-[4%] bottom-[4%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">Apply</button>
    </div>
     
</>

	)
}