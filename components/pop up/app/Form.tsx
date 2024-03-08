
export default function Form({ send }: { send: any }) {
//@ts-ignore
const handleClick = () => {
     var data="doesn't matter"
     send(data);
  };

return (
<div className="shade">
<div className="form">
<p className="exit" onClick={handleClick}>X</p>
<div className="inner-form">
<input type="text" />
<input type="text" />
<input type="text" />
</div>
</div>
</div>
)
}


