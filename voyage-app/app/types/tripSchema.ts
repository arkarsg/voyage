import type { FormData } from './tripForm';
import { z, type ZodType } from 'zod';

export const TripSchema: ZodType<FormData> = z.object({
  tripName: z.string().max(30, { message: 'Trip name is too long' }),
  tripDestination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
