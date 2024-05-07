import React from 'react';
import { useController, Controller } from 'react-hook-form';
import type { FormFieldProps } from '../../types';
import { Text } from 'tamagui';
import DatePicker from './DatePickerModal';

const DateField: React.FC<FormFieldProps> = ({ control, name, error, isRequired }) => {
  const { field } = useController({ control, name: name });

  const handleStartDateChange = (newStartDate: Date | undefined): void => {
    console.log(newStartDate?.getDate());
    field.onChange([newStartDate, field.value[1]]);
  };

  const handleEndDateChange = (newEndDate: Date | undefined): void => {
    console.log(newEndDate?.getDate());
    field.onChange([field.value[0], newEndDate]);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: isRequired,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <DatePicker
            startDate={value[0]}
            endDate={value[1]}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
          {error && <Text color="$red8">{error.message}</Text>}
        </>
      )}
    />
  );
};

export default DateField;
