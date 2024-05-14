export default function table_report_monthy_products(){
let warehouse_data=["company", "warehouse 1", "warehouse 2", "warehouse 3", "warehouse 4", "warehouse 5", "warehouse 6"]
let YEAR=2024
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


let years_data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 
                 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 
                 'Jan', 'Feb'];
let warehouses = warehouse_data.map((item) => {
    return (<p>{item}</p>);
});




let years=years_data.map((item) => {
    return (    <p className="w-[5vw] border-black border border-b-0 border-t-0 ">{item}</p>);
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

     <p className="text-center mb-[1rem] text-[1.5em]">{YEAR}</p>
        <div className="w-fit overflow-y-auto flex justify-start border-black border  border-l-0 border-r-0 ">
            <p className="w-[9.5vw]"></p>
            {years}
        </div>
        <div className="flex w-fit h-[100%] overflow-x-hidden overflow-y-scroll">
            <div className="h-fit flex flex-col w-[9.5vw] items-center border-black border border-t-0 border-b-0 border-l-0  ">
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