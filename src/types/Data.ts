export type Product = {
    id: number;
    name: string;
    quantity: number;
    description: string;
    safety_level: number;
    color: string;
  };
  export interface ProductWareHouse extends Product {
    price: number; 
  }
  export interface ProductCompany extends Product {
    mid_price: number; 
  }
export  type Shipment = {
    id: number;
    name: string;
    driver: string;
    origin_factory_id: number;
    products: ProductWareHouse[];
  };
  
export   type Warehouse = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    products: ProductWareHouse[];
    shipments?: Shipment[] | string; // Optional, can be array or empty string
  };
  
  export   type Factory = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    products: ProductWareHouse[];
  };
  
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