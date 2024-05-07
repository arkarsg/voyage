import type { Control, FieldError, Merge, ValidationRule } from 'react-hook-form';

export interface FormData {
  tripName: string;
  tripDestination: string;
  startDate: string;
  endDate: string;
}

export interface FormFieldProps {
  control: Control<FormData>;
  placeholder?: string;
  name: ValidFieldNames;
  isRequired: ValidationRule<boolean>;
  error: Merge<FieldError, [(FieldError | undefined)?, (FieldError | undefined)?]> | undefined;
}

export type ValidFieldNames = 'tripName' | 'tripDestination' | 'startDate' | 'endDate';
