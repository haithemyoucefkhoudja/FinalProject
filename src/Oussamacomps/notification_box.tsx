type Props={
text:string;
date:string;
}


export default function notification_box(props:Props){
let temp="Lorem ipsum dolor sit amim veniam, quis noscreyuttuyutreztkjlhytryjhgktryhgjkgrtetyjhkreztjhkrezrtjo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
let date="September 17, 1985."
return(
<>
<div className="text-[1.25em] overflow-y-scroll w-[40vw] h-[30vh] rounded-[1rem] p-[1rem] border black-border absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"> 
 
      <p className="">{temp}</p> {/*put props.text inside this p later*/}
      <hr className="h-2 border border-solid mt-[1rem] border-[2px] rounded w-[80%] bg-black m-auto" />
      <p className=" mt-[0.5rem] text-center text-[1.5em]">{date}</p> {/*and replace this with props.date*/}
    </div>


</>
)
}