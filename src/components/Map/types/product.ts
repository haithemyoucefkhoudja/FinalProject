export interface IProduct {
    p_name: string;
    p_quantity: number; // Or string, depending on how you store quantity
    p_unit_price: number;
    p_soft_limit: number;
    p_hard_limit: number; 
}