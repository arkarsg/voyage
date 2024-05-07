import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { YStack, Button, Form, H4 } from 'tamagui';
import FormField from './FormField';

import { TripSchema, type FormData } from '../../types';

export default function CreateTripForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tripName: undefined,
      tripDestination: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    resolver: zodResolver(TripSchema),
  });

  const onSubmit = async (data: FormData): Promise<void> => {
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
        <FormField
          control={control}
          placeholder="Trip name"
          name="tripName"
          isRequired={true}
          error={errors.tripName}
        />
        <FormField
          control={control}
          placeholder="Destination"
          name="tripDestination"
          isRequired={true}
          error={errors.tripDestination}
        />
        <FormField
          control={control}
          placeholder="Start date"
          name="startDate"
          isRequired={false}
          error={errors.startDate}
        />
        <FormField
          control={control}
          placeholder="End date"
          name="endDate"
          isRequired={false}
          error={errors.endDate}
        />
        <Form.Trigger asChild>
          <Button borderRadius="$6" width="100%">
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
