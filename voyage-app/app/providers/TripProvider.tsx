import React, { createContext, useEffect, useState, useContext } from 'react';
import type Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { type Subscription } from 'realm/dist/bundle';
import { Trip } from '@models/Trip';

interface ITripContext {
  currentTrip: Trip | null | undefined;
  tripSubscription: Subscription | null | undefined;
  trips: Realm.Results<Trip>;
  setCurrentTripById: (tripId: string) => void;
}

const TripContext = createContext<ITripContext | null>(null);

const TripProvider = (props: React.PropsWithChildren): React.JSX.Element => {
  const realm = useRealm();
  const [tripSubscription, setTripSubscription] = useState<Subscription | null>();
  const trips = useQuery(Trip, (collection) => collection.sorted('startDate'), []);
  const [currentTrip, setCurrentTrip] = useState<Trip | null | undefined>(trips.at(0));

  useEffect(() => {
    const updateSubscription = async (): Promise<void> => {
      await trips.subscribe({
        name: 'My trips',
      });
    };

    updateSubscription().catch(console.error);
    const subscription = realm.subscriptions.findByName('My trips');
    setTripSubscription(subscription);
  }, [realm, trips]);

  const setCurrentTripById = (tripId: string): void => {
    const selectedTrip = trips.find((trip) => trip._id.toString() === tripId);
    setCurrentTrip(selectedTrip ?? null);
  };

  return (
    <TripContext.Provider value={{ currentTrip, tripSubscription, trips, setCurrentTripById }}>
      {props.children}
    </TripContext.Provider>
  );
};

const useTripContext = (): ITripContext => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

export { TripProvider, useTripContext };
