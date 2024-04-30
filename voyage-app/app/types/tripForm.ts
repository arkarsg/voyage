import type { Control, FieldError } from 'react-hook-form';

export interface FormData {
  tripName: string;
  tripDestination: string;
  startDate: string;
  endDate: string;
}

export interface FormFieldProps {
  control: Control<FormData>;
  placeholder: string;
  name: ValidFieldNames;
  error: FieldError | undefined;
}

export type ValidFieldNames = 'tripName' | 'tripDestination' | 'startDate' | 'endDate';
