import Link from 'next/link';
export default function(){
const F_data = [
  { url: "/driver", title: "item 1" },
  { url: "/map", title: "item 2" },
  { url: "/", title: "item 3" },
  { url: "/", title: "item 4" },
  { url: "/", title: "item 5" },
  { url: "/", title: "item 6" },
  { url: "/", title: "item 7" },
  { url: "/", title: "item 8" },
  { url: "/", title: "item 9" },
  { url: "/", title: "item 10" },
  { url: "/", title: "item 11" }
];
    return (
    	<div className="custom-scrollbar border-2 border-black w-[12vw] max-h-[50vh] h-[50vh] rounded absolute top-[15vh] right-[2vw] flex flex-col items-center p-[0.5rem] bg-white">
    	<h2 className="text-green-500 text-[1.8rem]">-Factories-</h2>
    	<div className="text-blue-500 custom-scrollbar flex flex-col items-center text-[1.5rem] w-[75%] max-h-[10vh] overflow-y-auto ">
    		{F_data.map(item => ( 
          <Link href={item.url}>{item.title}</Link>
        ))}
    	</div>
    	<h2 className="text-green-500 text-[1.8rem]">-Warehouses-</h2>
    	<div className="text-blue-500 custom-scrollbar flex flex-col items-center text-[1.5rem] w-[75%] max-h-[10vh] overflow-y-auto">
    		{F_data.map(item => ( 
          <Link href={item.url}>{item.title}</Link>
          ))}
    	</div>
    	<h2 className="text-green-500 text-[1.8rem]">-Shipments-</h2>
    	<div className="text-blue-500 custom-scrollbar flex flex-col items-center text-[1.5rem] w-[75%] max-h-[10vh] overflow-y-auto">
    		{F_data.map(item => ( 
          <Link href={item.url}>{item.title}</Link>
          ))}
    	</div>
    	</div>
	);
}