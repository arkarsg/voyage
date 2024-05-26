import { useTripContext } from '../../../providers/TripProvider';
import CreateTripForm from '../../../components/ui/form/CreateTripForm';
import React from 'react';
import { YStack, Text } from 'tamagui';

export default function HomeTab(): React.JSX.Element {
  const { currentTrip } = useTripContext();

  return (
    <YStack>
      <CreateTripForm />
      {currentTrip ? <Text>currentTrip.name</Text> : <Text>No trips</Text>}
    </YStack>
  );
}
