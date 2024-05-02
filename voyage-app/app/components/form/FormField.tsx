import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Text } from 'tamagui';

import type { FormFieldProps } from '../../types';

const FormField: React.FC<FormFieldProps> = ({
  control,
  placeholder,
  name,
  error,
  ...otherProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            size="$4"
            width="100%"
            {...otherProps}
          />
          {error && <Text color="$red8">{error.message}</Text>}
        </>
      )}
    />
  );
};

export default FormField;
