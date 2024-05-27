import Product_info_card  from "@/prototyping_components/product_info_card.tsx";

type Props={
    product_name:string;
    product_desc:string;
}
export default function Page(){

const data:Props[] = [
    {
         product_name: 'Name 1',
         product_desc: 'description number 1, eteregtfrdgregrueghsrdhgiusrefgrezsgfuyresgfuyerzsgfreziyufgzuyeiqgfuiyzqgfiuzgesfyygziqfg',

    },
    {
         product_name: 'Name 2',
         product_desc: 'description number 2, eteregtfrdgregrueghsrdhgiusrefgrezsgfuyresgfuyerzsgfreziyufgzuyeiqgfuiyzqgfiuzgesfyygziqfg',


    },
    {
         product_name: 'Name 3',
         product_desc: 'description number 3, eteregtfrdgregrueghsrdhgiusrefgrezsgfuyresgfuyerzsgfreziyufgzuyeiqgfuiyzqgfiuzgesfyygziqfg',


    },
  
];

	const cards=data.map((item)=>{
		return <div className="mt-[1rem] mb-[1rem]"><Product_info_card product_name={item.product_name} product_desc={item.product_desc} /></div>
	})
	return(
		<div className="flex flex-col items-center rounded-lg border border-gray-500 bg-white text-gray-950 shadow-sm ">
		   <button className="mt-[2vh] bg-blue-500 w-[7.5vw] p-[0.5rem] text-white rounded">Add product</button>
	        <div className="flex flex-col justify-evenly items-center">
	        {cards}
	        </div>
		</div>
	)
}