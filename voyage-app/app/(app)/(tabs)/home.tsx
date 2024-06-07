import CreateTripForm from '@components/ui/form/CreateTripForm';
import { useTripContext } from '@providers/TripProvider';
import React from 'react';
import { YStack, Text } from 'tamagui';

export default function HomeTab(): React.JSX.Element {
  const { currentTrip } = useTripContext();

  return (
    <YStack fullscreen flex={1} alignItems="center" justifyContent="center">
      {currentTrip ? (
        <Text>{currentTrip.tripName}</Text>
      ) : (
        <Text>You have not selected any trips</Text>
      )}
      <CreateTripForm />
    </YStack>
  );
}
