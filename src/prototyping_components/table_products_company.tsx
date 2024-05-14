import Popup_text_description from "./popup_text_description.tsx"
import { useState,useEffect } from 'react'

export default function Table_products_company(){
  let company_name="DN corp"
const data_1 = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
  210, 220, 230, 240, 250, 260, 270, 280, 290, 300
];

// Array 2
const data_2 = [
  "apple", "banana", "orange", "grape", "kiwi",
  "melon", "peach", "plum", "pear", "cherry",
  "apricot", "mango", "pineapple", "strawberry", "blueberry",
  "raspberry", "blackberry", "watermelon", "pomegranate", "lime",
  "lemon", "coconut", "avocado", "fig", "guava",
  "passionfruit", "dragonfruit", "papaya", "lychee", "starfruit"
];

// Array 3
const data_3 = [
  "true", "false", "true", "false", "true",
  "true", "false", "false", "true", "true",
  "false", "true", "false", "true", "true",
  "false", "true", "false", "true", "true",
  "true", "false", "true", "false", "true",
  "true", "false", "true", "false", "true"
];

// Array 4
const data_4 = [
  3.14, 2.71, 1.618, 1.414, 1.732,
  2.236, 2.718, 3.142, 4.669, 6.626,
  8.854, 12.345, 15.926, 20.101, 25.888,
  31.415, 37.879, 44.222, 50.265, 56.618,
  62.832, 68.954, 74.007, 78.539, 82.693,
  86.467, 89.879, 92.999, 95.843, 98.407
];

// Array 5
const data_5 = [
  "red", "green", "blue", "yellow", "purple",
  "cyan", "magenta", "pink", "orange", "black",
  "white", "gray", "brown", "teal", "olive",
  "navy", "maroon", "salmon", "turquoise", "lavender",
  "coral", "crimson", "indigo", "violet", "gold",
  "silver", "bronze", "platinum", "ruby", "emerald"
];

  let IDs=[]
  let index=1
  while (index <= data_1.length) {
    // Push <p> element containing the current index value into the array
    IDs.push(<p>{index}</p>);
    // Increment index
    index++;
}
 index=1
 let states=[]
 let stateSets=[]
  while (index <= data_1.length){
  	const [state, setState] = useState(false);
    states.push(state);
    stateSets.push(setState);
    index++;
  }
  

 const col_1 =data_1.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))
 const col_2 =data_2.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))
  const col_3 =data_3.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))
  const col_4 =data_4.map((item, index) => (
  <button className="bg-blue-500 text-white rounded w-[50%] text-[0.85em] h-[3.02vh] mb-[0.5rem]" onClick={()=>{stateSets[index](true)}}  key={index}>view desc</button>
))
  const col_5 =data_5.map((item, index) => (
  <p className="ml-[0.5rem] text-[1em] block w-full" key={index}>{item}</p>
))

 

  useEffect(() => {
   
    console.log('states:', states);
    console.log('sets:', stateSets);

   

 
}, [states]); // Dependency array containing `myArray`

const conditional_popups_rendering = data_4.map((item, index) => (
    states[index] && <Popup_text_description text={item} send={() => stateSets[index](false)} key={index} />
  ));
	return(
  <>

	<div className="w-[90vw] h-[90vh]  text-black overflow-hidden">
    <p className="text-center text-[2em] pb-[2.5rem]" >Company : {company_name}</p>

		<div className="flex justify-center border-black border border-l-0 border-r-0 border-t-0">
			<p className="w-[1%]">       </p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">Product</p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">Quantity</p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">Mid price</p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">Description</p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">Safety level</p>
			<p className="w-[15%] border-black border border-b-0 border-t-0 border-r-0">average revenue</p>

		</div>
		<div className="flex h-[100%] overflow-x-hidden overflow-y-scroll">
			<div className="h-fit flex flex-col w-[5%] items-center border-black border border-b-0 border-l-0  ">
			{IDs}
			</div>
			<div className="w-[100%]  flex">
				<div className="w-[16%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{col_1}</div> 
				<div className="w-[16%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{col_2}</div> 
				<div className="w-[16%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{col_3}</div> 
				<div className="w-[16%] border-black border border-b-0 border-l-0 border-t-0 h-fit flex flex-col items-center">{col_4}</div> 
				<div className="w-[16%] border-black border border-b-0 border-l-0 border-t-0 h-fit">{col_3}</div>
				<div className="w-[16%] h-fit">{col_5}</div> 
			</div>
		</div>
	{conditional_popups_rendering}
	</div>
  </>
	)
}