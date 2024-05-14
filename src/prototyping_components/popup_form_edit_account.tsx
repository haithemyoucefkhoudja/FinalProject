export default function Popup_form_edit_account (props){
function handleClick(){
	
  props.send();
}
return (
		<>
	 <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="flex justify-center items-center text-black w-[40vw] h-[40vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="fixed top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
  
      		<p className="absolute left-[37%] top-[5%]  h-[50%] ">Edit account</p>
      		<div className="flex flex-col justify-between h-[40%] ">
      	    	<div className=" flex w-[110%] justify-between"><p>Account username</p><input type="text" className=" bg-white border black-border rounded outline-none"/></div>
      	    	<div className=" flex w-[110%] justify-between"><p>Account role </p><input type="text" className=" bg-white border black-border rounded outline-none"/></div> {/* this and under is should be a dropdown, but since we haven't made up our mind I'll leave it as is for now*/}
      	    	<div className=" flex w-[110%] justify-between"><p>warehouse post</p><input type="text" className=" bg-white border black-border rounded outline-none"/></div>
      		</div>
     
      <button className="absolute right-[4%] bottom-[4%] p-[0.5rem] bg-blue-500 text-white rounded text-[0.85em]">Apply</button>
    </div>
     
</>
)
}