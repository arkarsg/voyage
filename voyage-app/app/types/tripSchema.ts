import type { FormData } from './tripForm';
import { z, type ZodType } from 'zod';

function containsIllegalCharacters(str: string): boolean {
  return str.match(/[$<>;{}]/) !== null;
}

export const TripSchema: ZodType<FormData> = z
  .object({
    tripName: z
      .string()
      .min(1, { message: 'Trip name must have at least 1 character' })
      .max(30, { message: 'Trip name must have less than 30 characters' }),
    tripDestination: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => !containsIllegalCharacters(data.tripName), {
    message: 'Trip name cannot contain special characters',
    path: ['tripName'],
  });
