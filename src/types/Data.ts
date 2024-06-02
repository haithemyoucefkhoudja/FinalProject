  export type Product = {
    id: number;
    name: string;
    quantity: number;
  };
  
  export type WarehouseType = 'Factory' | 'Warehouse'
  export interface BaseProduct extends Product {
    description: string;
    safety_level: number;
  }
  export interface ProductWareHouse extends BaseProduct {
    price: number; 
    color: string;
  }

  export interface ProductCompany extends BaseProduct {
    mid_price: number; 
  }

  export  type Shipment = {
    id: number;
    name: string;
    arrival_time:string
    driver: string | null;
    origin_factory: string;
    origin_longitude: number,
    origin_latitude: number,
    products: Product[];
  };
  
export   type Warehouse = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    products: ProductWareHouse[];
    shipments?: Shipment[] // Optional, can be array or empty string
  };
  export type AccountInfo = {
    id:number;
    name:string;
    warehouse:string;
    role:'admin'| 'worker'|'driver'| 'observer'
    email:string
  }
export type DataPerWarehouse ={
    warehouse_id:number;
    warehouse_name:string;
    price: number;
    safety_level:number
  }
export type ProductInfo ={
  id:number;
  name:string;
  description:string;
  data_per_warehouse:DataPerWarehouse[];
}
  export interface Common extends Warehouse {
    type:WarehouseType
  }
  export   type Factory = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    products: ProductWareHouse[];
  };
  export interface ExtendedShipment extends Shipment {
    destination_warehouse: string;
    destination_warehouse_coords:[number, number];
    origin_factory_coords:[number, number];
  }
  export interface DCShipment extends Shipment {
    destination_warehouse: string;
  }
  export type Company = {
    name: string;
    longitude: string;
    latitude: string;
    products: ProductCompany[];
  };
  
  export  type Data = {
    company: Company;
    factories: Factory[];
    warehouses: Warehouse[];
  };