import Warehouse_info_card  from "@/prototyping_components/warehouse_info_card.tsx";
type WarehouseType = 'Factory' | 'Warehouse';

type Props={
    warehouse_name:string;
    long:number;
    lat:number;
    type: WarehouseType;
}
export default function Page(){
const data:Props[] = [
    {
        type: 'Factory',
        warehouse_name: "Factory Bejaia N1",
        long: 5.0754,
        lat: 36.7416
    },
    {
        type: 'Warehouse',
        warehouse_name: "Warehouse Oum El Bouaghi N2",
        long: 7.1505,
        lat: 35.8819
    },
    {
        type: 'Warehouse',
        warehouse_name: "Warehouse Mostaganem N3",
        long: 0.1467,
        lat: 35.9158
    },
    {
        type: 'Warehouse',
        warehouse_name: "Warehouse Ouargla N4",
        long: 5.3345,
        lat: 31.9526
    }
];

	const cards=data.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><Warehouse_info_card warehouse_name={item.warehouse_name} type={item.type} long={item.long} lat={item.lat}  /></div>
	})
	return(
		<div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	      	<div className="flex flex-col justify-evenly items-center">
	        {cards}
	   
	        </div>
		</div>
	)
}