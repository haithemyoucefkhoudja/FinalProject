import { z } from 'zod';
export const DPFormSchema = z.object({
  warehouse: z.string()
  .min(1, "Destination warehouse is required")
  .max(30, "Destination warehouse is Too Long"),
  
});