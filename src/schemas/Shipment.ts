import { z } from 'zod';
export const ShipmentFormSchema = z.object({
  origin_factory: z.string()
  .min(1, "Origin factory is required")
  .max(30, "Origin factory is Too Long"),
  destination_warehouse: z.string()
  .min(1, "Destination warehouse is required")
  .max(30, "Destination warehouse is Too Long"),
  driver: z.string()
  .min(1,"Driver is required")
  .max(30,"Driver warehouse is Too Long"),
  mean_transportation: z.string()
  .min(1, "Transportation mean is required")
  .max(30, "Transportation mean is Too Long"),
  arrival_time: z.string()
  .min(1, "Arrival time is required")
  .max(30, "Arrival time is Too Long"),
});