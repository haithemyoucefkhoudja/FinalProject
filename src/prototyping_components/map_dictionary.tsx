import Link from 'next/p';
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
const W_data = [
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
const S_data = [
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
    	<div className="hide-scrollbar  border-[6px] rounded border-black w-[12vw] max-h-[70vh] h-[70vh] rounded absolute top-[15vh] right-[2vw] flex flex-col items-center ">
    	<h2 className="text-black text-[2rem] border border-[2px] border-black border-l-0 border-r-0 w-[100%] text-center bg-gray-200">Factories</h2>
    	<div className="hide-scrollbar text-blue-500  flex flex-col items-center text-[1.5rem] w-[100%] max-h-[17vh] overflow-y-auto ">
    		{F_data.map(item => ( 
          <Link className="text-black text-[1em] border border-[1px] border-black border-l-0 border-r-0 w-[100%] text-center " href={item.url}>{item.title}</Link>
        ))}
    	</div>
    	<h2 className="text-black text-[2rem] border border-[2px] border-black border-l-0 border-r-0 w-[100%] text-center bg-gray-200">Warehouses</h2>
    	<div className=" hide-scrollbar flex flex-col items-center text-[1.5rem] w-[100%] max-h-[17vh] overflow-y-auto">
    		{W_data.map(item => ( 
          <Link className="text-black text-[1em] border border-[1px] border-black border-l-0 border-r-0 w-[100%] text-center " href={item.url}>{item.title}</Link>
          ))}
    	</div>
    	<h2 className="text-black text-[2rem] border border-[2px] border-black border-l-0 border-r-0 w-[100%] text-center bg-gray-200">Shipments</h2>
      <div className=" hide-scrollbar flex flex-col items-center text-[1.5rem] w-[100%] max-h-[17vh] overflow-y-auto">
    		{S_data.map(item => ( 
          <Link className="text-black text-[1em] border border-[1px] border-black border-l-0 border-r-0 w-[100%] text-center " href={item.url}>{item.title}</Link>
          ))}
    	</div>
    	</div>
	);
}
