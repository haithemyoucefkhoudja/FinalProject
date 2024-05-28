import Truck_info_card  from "@/prototyping_components/truck_info_card.tsx";
type Props={
    model:string;
    id:number;
    plate:string;
    run:number;
    state:string;
}


export default async function Page(){
    const data:Props[] = [
      {
        model: "Toyota Camry",
        id: "123456",
        plate: "ABC123",
        run: "10000",
        state: "California"
    },
    {
        model: "Honda Accord",
        id: "789012",
        plate: "XYZ789",
        run: "15000",
        state: "New York"
    },
    {
        model: "Ford Mustang",
        id: "345678",
        plate: "DEF456",
        run: "20000",
        state: "Texas"
    }
    ];


	const cards=data.map((item)=>{

        return <span className="m-[3vh]"><Truck_info_card model={item.model} id={item.id} plate={item.plate} run={item.run} state={item.state}/></span>
    })
    return (
     <>
    
	   <div className="flex flex-col items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
        <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded">Add vehicle</button>
	    <div className="flex flex-col items-center">
	     {cards}

	    </div>
	   </div>
	 </>
	)
}