import Truck_info_card  from "@/prototyping_components/truck_info_card.tsx";
type Props={
    Account_model:string;
    Account_id:number;
    plate:string;
    run:number;
    state:string;
}


export default async function Page(){
    const data:Props[] = [
      {
        Account_model: "Toyota Camry",
        Account_id: "123456",
        plate: "ABC123",
        run: "10000",
        state: "California"
    },
    {
        Account_model: "Honda Accord",
        Account_id: "789012",
        plate: "XYZ789",
        run: "15000",
        state: "New York"
    },
    {
        Account_model: "Ford Mustang",
        Account_id: "345678",
        plate: "DEF456",
        run: "20000",
        state: "Texas"
    }
];


	const cards=data.map((item)=>{

		return <span className="m-[3vh]"><Truck_info_card Account_model={item.Account_model} Account_id={item.Account_id} plate={item.plate} run={item.run} state={item.state}/></span>
	})
	return (
	 <>
	   <div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	    <div className="flex flex-col items-center">
	     {cards}

	    </div>
	   </div>
	 </>
	)
}