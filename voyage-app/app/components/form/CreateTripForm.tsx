import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser, useRealm } from '@realm/react';
import { BSON } from 'realm';

import { Button, Form, H4, YStack } from 'tamagui';
import FormField from './FormField';

import { TripSchema, type FormData } from '../../types';
import DateField from './DateFormField';

export default function CreateTripForm(): React.JSX.Element {
  const user = useUser();
  const realm = useRealm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tripName: undefined,
      tripDestination: undefined,
      dateRange: [undefined, undefined],
    },
    resolver: zodResolver(TripSchema),
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log(data);
    const { tripName, tripDestination, dateRange } = data;
    const [startDate, endDate] = dateRange;
    const creator = new BSON.ObjectID(user.id);

    const dest = {
      tripDestination,
    };
    realm.write(() => {
      return realm.create('Trip', {
        tripName,
        startDate,
        endDate,
        dest,
        creatorId: creator,
        tripMembers: [creator],
      });
    });

    await user?.functions.createTrip({
      tripName: tripName,
      tripDestination: tripDestination,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  };

  return (
    <YStack padding="$4" gap="$4">
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
        <DateField control={control} name="dateRange" isRequired={true} error={errors.dateRange} />
        <Form.Trigger asChild>
          <Button borderRadius="$6" width="100%">
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
