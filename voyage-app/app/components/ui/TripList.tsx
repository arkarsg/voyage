import React from 'react';
import type Realm from 'realm';
import { type Trip } from '@models/Trip';
import { YGroup, ListItem, Separator, Text, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';

interface TripListProps {
  setCurrentTrip: (tripId: string) => void;
  currentTrip: Trip | null | undefined;
  trips: Realm.Results<Trip>;
}

export default function TripList({
  setCurrentTrip,
  currentTrip,
  trips,
}: TripListProps): React.JSX.Element {
  return (
    <YGroup alignSelf="center" bordered width={'100%'} p="$2.5" separator={<Separator />}>
      {trips.map((trip) => (
        <YGroup.Item key={trip._id.toString()}>
          <ListItem
            pressTheme
            onPress={() => {
              setCurrentTrip(trip._id.toString());
            }}
            iconAfter={<Feather name="chevron-right" size={16} />}
          >
            <YStack gap="$2" p="$1.5">
              <Text fontSize="$2" color="grey">
                {trip.tripDestination.name}
              </Text>
              <Text
                fontSize="$4"
                color={
                  currentTrip?._id.toString() === trip._id.toString() ? '$purple10' : undefined
                }
              >
                {trip.tripName}
              </Text>
            </YStack>
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>
  );
}
