import Product_info_card  from "@/prototyping_components/product_info_card.tsx";


type Props={
    product_name:string;
}
export default function Page(){
const data:Props[] = [
    {
         product_name: 'Name 1',

    },
    {
         product_name: 'Name 2',

    },
    {
         product_name: 'Name 3',

    },
  
];

	const cards=data.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><Product_info_card product_name={item.product_name}  /></div>
	})
	return(
		<div className="rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
	      	<div className="flex flex-col justify-evenly items-center">
	        {cards}
	   
	        </div>
		</div>
	)
}