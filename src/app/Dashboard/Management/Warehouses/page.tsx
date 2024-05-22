import Warehouse_info_card  from "@/prototyping_components/warehouse_info_card.tsx";
export default function Page(){
const data = [
    {
        boolean: 3,
        warehouse_name: "Factory Bejaia N1",
        long: 5.0754,
        lat: 36.7416
    },
    {
        boolean: 2,
        warehouse_name: "Warehouse Oum El Bouaghi N2",
        long: 7.1505,
        lat: 35.8819
    },
    {
        boolean: 1,
        warehouse_name: "Warehouse Mostaganem N3",
        long: 0.1467,
        lat: 35.9158
    },
    {
        boolean: 0,
        warehouse_name: "Warehouse Ouargla N4",
        long: 5.3345,
        lat: 31.9526
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