import type { Control, FieldError, Merge } from 'react-hook-form';

export interface FormData {
  tripName: string;
  tripDestination: string;
  dateRange: [Date | null, Date | null];
  startDate: string;
  endDate: string;
}

export interface FormFieldProps {
  control: Control<FormData>;
  placeholder?: string;
  name: ValidFieldNames;
  error: Merge<FieldError, [(FieldError | undefined)?, (FieldError | undefined)?]> | undefined;
}

export type ValidFieldNames =
  | 'tripName'
  | 'tripDestination'
  | 'startDate'
  | 'endDate'
  | 'dateRange';
