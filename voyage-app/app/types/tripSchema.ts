import type { FormData } from './tripForm';
import { z, type ZodType } from 'zod';

function containsIllegalCharacters(str: string): boolean {
  return str.match(/[$<>;{}]/) !== null;
}

export const TripSchema: ZodType<FormData> = z
  .object({
    tripName: z.string().max(30, { message: 'Trip name is too long' }),
    tripDestination: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => !containsIllegalCharacters(data.tripName), {
    message: 'Trip name cannot contain special characters',
    path: ['tripName'],
  });
