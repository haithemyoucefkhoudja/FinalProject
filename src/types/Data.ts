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
    products: Product[];
  };
  
export   type Warehouse = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    products: ProductWareHouse[];
    shipments: Shipment[] | undefined; // Optional, can be array or empty string
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