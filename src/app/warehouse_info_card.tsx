import {faTrashCan} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function warehouse_info_card() {
    let boolean = 2;
    let warehouse_name = "highway 7 storage";
    let long=12.7;
    let lat=17.9;
    return (
        <div className="w-[35vw] h-[20vh] border border-black rounded flex justify-center items-center text-[1.5em] relative">
            <div>
            	<p>{boolean === 1 ? "Factory" : "Warehouse"}: {warehouse_name}</p>
            	<p>Coordinates:</p>
            	<p>{long}</p>
            	<p>{lat}</p>
            </div>
            <div className="flex  justify-between w-[7%] absolute bottom-[0] right-[0] m-[1rem]">
				
				<FontAwesomeIcon icon={faTrashCan} />
				<FontAwesomeIcon icon={faPenToSquare} />
			</div>
        </div>
    );
  }

