export default function table_report_daily_sales(){
let warehouse_data=["DN coperation","warehouse 1", "warehouse 2", "warehouse 3", "warehouse 4", "warehouse 5", "warehouse 6", "warehouse 7"]

let column_data=[
  [3, 1, 4, 2],
  [7, 9, 6, 8],
  [5, 2, 1, 3],
  [9, 4, 7, 6],
  [8, 3, 2, 5],
  [6, 7, 1, 9],
  [2, 5, 8, 4],
  [1, 8, 3, 7],
  [4, 6, 9, 2],
  [5, 3, 7, 1],
  [8, 2, 6, 4],
  [7, 1, 9, 5],
  [6, 4, 8, 3],
  [9, 7, 2, 1],
  [3, 5, 1, 8],
  [2, 6, 4, 7],
  [1, 9, 3, 5],
  [4, 8, 7, 2],
  [7, 2, 5, 6],
  [5, 1, 8, 9],
  [8, 4, 3, 7]
]


let years_data= ["2024 2/18","2023 2/17","2022 2/16","2021 2/15",2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003];
let warehouses = warehouse_data.map((item) => {
    return (<p>{item}</p>);
});




let years=years_data.map((item) => {
    return (	<p className="w-[5vw] border-black border border-b-0 border-t-0 ">{item}</p>);
});
let columns=column_data.map((item)=>{
	return (<div className="w-[5vw] border-black border border-b-0 border-l-0 border-t-0 h-fit ">{
    item.map((item2)=>{
    	return(<p>{item2}</p>)
    })
	}</div> )
})

return(
 <>

	<div className="text-[1.5em] w-[90vw] h-[90vh] overflow-y-auto   text-black ">


		<div className="w-fit overflow-y-auto flex justify-start border-black border border-l-0 border-r-0 border-t-0">
			<p className="w-[9.5vw]"></p>
			{years}
		</div>
		<div className="flex w-fit h-[100%] overflow-x-hidden overflow-y-scroll">
			<div className="h-fit flex flex-col w-[9.5vw] items-center border-black border border-b-0 border-l-0  ">
			{warehouses}
			</div>
			<div className="w-fit overflow-y-scroll flex">
				{columns}
				<div className="w-[5vw] h-fit"></div> 
			</div>
		</div>

	</div>
  </>

)


}