import { z } from "zod";

export const ProductManagementFormSchema = z.object({
    name: z.string()
    .min(1, "Product Name is required")
    .max(30, "Product Name is Too Long"),
    Descreption: z.string().min(10, 'Descreption is too short'),
  })
 /*const ProductsFormSchema = z.object({
    products:ProductManagement.array().min(1, 'At least one product')
})*/