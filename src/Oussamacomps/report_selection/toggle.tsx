export default function toggle(props:any){
	const handleClickOne=()=>{
	props.setForState(1)	
	}
	const handleClickTwo=()=>{
	props.setTypeState(0)
	}
	const selected={
		color:'blue',
		backgroundColor:'rgba(0,0,255,0.1)',
		border:'1px solid blue',
	}
    const norm={
       color:'grey'
    }
    
    const style1=props.selection==1 ? selected: norm;
    const style2=props.selection==0 ? selected: norm;
	return( 
	<main className="flex flex-row relative">
	<div className="w-[10vw] h-[4vh] border border-black  rounded-full rounded-r-lg flex justify-center items-center " 
	style={style1}
	onClick={handleClickOne}
	>{props.first}</div>
	<div className="w-[10vw] h-[4vh] border border-black rounded-full rounded-l-lg flex justify-center items-center  "
	style={style2}
	onClick={handleClickTwo}
	>{props.second}</div>
	</main>
	);
}
