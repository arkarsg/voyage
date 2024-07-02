import TripList from '@components/ui/TripList';
import { useTripContext } from '@providers/TripProvider';
import React from 'react';
import { ScrollView, Text, YStack } from 'tamagui';

export default function TripsTab(): React.JSX.Element {
  const { setCurrentTripById, currentTrip, trips } = useTripContext();

  return (
    <YStack fullscreen>
      <Text>🏝️ Hey there</Text>
      <ScrollView>
        <TripList setCurrentTrip={setCurrentTripById} currentTrip={currentTrip} trips={trips} />
      </ScrollView>
    </YStack>
  );
}
