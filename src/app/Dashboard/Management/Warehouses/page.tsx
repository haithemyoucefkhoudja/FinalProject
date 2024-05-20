import Warehouse_info_card  from "@/prototyping_components/warehouse_info_card.tsx";
export default function Page(){
const data = [
    {
        boolean: 2,
        warehouse_name: "highway 7 storage",
        long: 12.7,
        lat: 17.9
    },
    {
        boolean: 1,
        warehouse_name: "main street storage",
        long: 10.5,
        lat: 15.3
    },
    {
        boolean: 0,
        warehouse_name: "elm street storage",
        long: 8.2,
        lat: 13.4
    }
];
console.log(data[0],data[0].warehouse_name)
	const cards=data.map((item)=>{
		return <span className="m-[3vh]" ><Warehouse_info_card warehouse_name={item.warehouse_name} boolean={item.boolean} long={item.long} lat={item.lat}  /></span>
	})
	return(
		<div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	      	<div className="flex flex-col items-center">
	        {cards}
	   
	        </div>
		</div>
	)
}