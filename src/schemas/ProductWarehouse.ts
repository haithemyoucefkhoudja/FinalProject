import { z } from "zod";

const ProductWarehouseFormSchema = z.object({
    warehouse_name:z.string().min(1, 'WarehouseName Is required'),
    price: z.number().min(1, 'Price must be greater than 0'),
    safety_level: z.number().min(1, 'Quantity must be greater than 0')
  })
export const ProductsWarehouseFormSchema = z.object({
    products:ProductWarehouseFormSchema.array().min(1, 'At least one product')
})