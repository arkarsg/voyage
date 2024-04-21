import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import { YStack, Button, Form, H4, Input } from 'tamagui';

export default function TripForm(): React.JSX.Element {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tripName: '',
      tripDestination: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = (data: string): void => {
    console.log(JSON.stringify(data));
  };

  return (
    <YStack fullscreen padding="$4" gap="$4">
      <Form
        alignItems="flex-start"
        gap="$4"
        onSubmit={handleSubmit(onSubmit)}
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$4"
      >
        <H4>Trip Form</H4>
        <Controller
          control={control}
          name={'tripName'}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder="RHF Trip name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              size="$4"
              width="100%"
            />
          )}
        />
        <Input placeholder="Destination" size="$4" width="100%" />
        <Input placeholder="Start date" size="$4" width="100%" />
        <Input placeholder="End date" size="$4" width="100%" />
        <Form.Trigger asChild>
          <Button borderRadius="$6" width="100%">
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
