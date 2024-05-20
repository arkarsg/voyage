import CreateTripForm from '../../../components/ui/form/CreateTripForm';
import React from 'react';
import { useQuery } from '@realm/react';
import { Trip } from '../../../models/Trip';
import { YStack, Text } from 'tamagui';

export default function HomeTab(): React.JSX.Element {
  // Return all collection items
  const collection = useQuery(Trip);
  return (
    <YStack>
      <CreateTripForm />
      <Text>{JSON.stringify(collection)}</Text>
    </YStack>
  );
}
