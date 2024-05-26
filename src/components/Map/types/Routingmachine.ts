
import { Session } from "next-auth";
import { IProduct } from "./product";

export interface RoutingMachineProps {
    data:Session| null;
    name:string;
    products:IProduct[]
    tocoords:[number, number];
    fromcoords: [number, number];
    updateExternalState: (driverId: string, newCords: [number, number]) => void;
  }