import type { Control, FieldError, Merge, ValidationRule } from 'react-hook-form';

export interface FormData {
  tripName: string;
  tripDestination: string;
  dateRange: Array<Date | undefined>;
}

export interface FormFieldProps {
  control: Control<FormData>;
  placeholder?: string;
  name: ValidFieldNames;
  isRequired: ValidationRule<boolean>;
  error: Merge<FieldError, Array<FieldError | undefined>> | undefined;
}

export type ValidFieldNames = 'tripName' | 'tripDestination' | 'dateRange';
