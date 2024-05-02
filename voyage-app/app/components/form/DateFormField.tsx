import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { FormFieldProps } from '../../types';
import { Text } from 'tamagui';
import DatePicker from './DatePickerModal';

const DateField: React.FC<FormFieldProps> = ({ control, name, error, ...otherProps }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(e) => {
              setDateRange(e);
              onChange(e);
            }}
          />
          {error && <Text color="$red8">{error.message}</Text>}
        </>
      )}
    />
  );
};

export default DateField;
