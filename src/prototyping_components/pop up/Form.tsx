
export default function Form({ send }: { send: any }) {
//@ts-ignore
const handleClick = () => {
     var data="doesn't matter"
     send(data);
  };

return (
<div className="fixed top-[0] left-[0] w-[100vw] h-[100vh] bg-black bg-opacity-20">
	<div className="flex flex-col justify-center items-center w-[21vw] h-[39vh] bg-[white] rounded-[1em] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
		<p className="absolute top-[2%] right-[2%] text-[2em] text-[red]" onClick={handleClick}>X</p>
		<h1 className="m-[5%] text-[2em]">Pop Up!</h1>
		<div className="h-[50%] w-[80%] flex justify-evenly flex-col">
			<input className="w-[100%] h-[20%] border border-black rounded-[0.25rem]" type="text" />
			<input className="w-[100%] h-[20%] border border-black rounded-[0.25rem]" type="text" />
			<input className="w-[100%] h-[20%] border border-black rounded-[0.25rem]" type="text" />
		</div>
	</div>
</div>
)
}


