import { z } from "zod";

 const ProductFormSchema = z.object({
    name: z.string()
    .min(1, "Product Name is required")
    .max(30, "Product Name is Too Long"),
    quantity: z.number().min(1, 'Quantity must be greater than 0'),
  })
export const ProductsFormSchema = z.object({
    products:ProductFormSchema.array().min(1, 'At least one product')
})