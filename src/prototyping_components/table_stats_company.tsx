export default function table_stats_company(){
let warehouse_data=["DN coperation","warehouse 1", "warehouse 2", "warehouse 3", "warehouse 4", "warehouse 5", "warehouse 6", "warehouse 7"]


let nextDayPrediction_data = [120, 130, 110, 140, 125, 135, 115,123];
let nextMonthPrediction_data = [1500, 1600, 1550, 1580, 1650, 1700, 1620,1347];
let nextYearPrediction_data = [20000, 20500, 21000, 21500, 22000, 225000, 230000,36888];
let averagerevenu_data = [200, 250, 300, 275, 225, 280, 260,644];

let warehouses = warehouse_data.map((item) => {
    return (<p>{item}</p>);
});

let nextday = nextDayPrediction_data.map((item) => {
    return (<p>{item}</p>);
});

let nextmonth = nextMonthPrediction_data.map((item) => {
    return (<p>{item}</p>);
});

let nextyear = nextYearPrediction_data.map((item) => {
    return (<p>{item}</p>);
});

let averageR = averagerevenu_data.map((item) => {
    return (<p>{item}</p>);
});

return(
 <>

	<div className="text-[1.5em] w-[90vw] h-[90vh]  text-black overflow-hidden">


		<div className="flex justify-evenly border-black border border-l-0 border-r-0 border-t-0">
			<p className="w-[10%]">       </p>
			<p className="w-[25%] border-black border border-b-0 border-t-0">Average revenu</p>
			<p className="w-[25%] border-black border border-b-0 border-t-0">Prediction next day</p>
			<p className="w-[25%] border-black border border-b-0 border-t-0">Prediction next month</p>
			<p className="w-[25%] border-black border border-b-0 border-t-0 border-r-0">Prediction next year</p>
		</div>
		<div className="flex h-[100%] overflow-x-hidden overflow-y-scroll">
			<div className="h-fit flex flex-col w-[10%] items-center border-black border border-b-0 border-l-0  ">
			{warehouses}
			</div>
			<div className="w-[100%]  flex">
				<div className="w-[25%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{averageR}</div> 
				<div className="w-[25%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{nextday}</div> 
				<div className="w-[25%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{nextmonth}</div> 
				<div className="w-[25%] h-fit">{nextyear}</div> 
			</div>
		</div>

	</div>
  </>

)


}