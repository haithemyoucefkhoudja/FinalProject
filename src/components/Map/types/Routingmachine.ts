import { Session } from "next-auth";
import { Product, ProductWareHouse } from "@/types/Data";

export interface RoutingMachineProps {
    session:Session;
    name:string;
    products:Product[]
    tocoords:[number, number];
    coords: [number, number];
    shipment_id: string;
    updateExternalState: (driverId: string,shipment_id: string, newCords: [number, number]) => void;
  }