

export default function Popup_text_description(props) {
function handleClick(){
  props.send();
}
  return (  
    <>
    <div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20" onClick={handleClick}></div>
    
    <div className="overflow-y-scroll w-[30vw] h-[60vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
      <p className="absolute top-[1%] right-[1%] text-[1.5em] text-[red]" onClick={handleClick}>X</p>
      <p >Description:</p>
      <p className="whitespace-normal m-[0.5em] text-[0.80em]">{props.text}</p>
    </div>
    </>
    )
}



