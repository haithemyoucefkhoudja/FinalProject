import { z } from "zod";
export const WarehouseFormSchema = z.object({
    warehouse_name: z.string()
    .min(1, "WarehouseName is Required")
    .max(30, "WarehouseName is Too Long")
    .regex(new RegExp("[A-Z].*"), {message:"WarehouseName must start with capital letter"}),
    warehouse_type: z.enum([
        "Factory",
        "Warehouse",
    ]),
    warehouse_Lat: z.number()
    .min(-90, "Latitude must be greater than or equal to -90 degrees")
    .max(90, "Latitude must be less than or equal to 90 degrees"),
    warehouse_Long: z.number()
    .min(-180, "Longitude must be greater than or equal to 180 degrees")
    .max(180, "Longitude must be less than or equal to 180 degrees")

    
})