import Realm, { type BSON, type ObjectSchema } from 'realm';
import type TripDestination from './TripDestination';

export class Trip extends Realm.Object {
  _id!: BSON.ObjectId;
  tripName!: string;
  startDate!: Date;
  endDate!: Date;
  tripDestination!: Realm.Object<TripDestination>;
  creatorId!: BSON.ObjectId;
  tripMembers!: Realm.Set<BSON.ObjectId>;

  static schema: ObjectSchema = {
    name: 'Trip',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      tripName: 'string',
      startDate: 'date',
      endDate: 'date',
      tripDestination: { type: 'object', objectType: 'TripDestination' },
      creatorId: 'objectId',
      tripMembers: 'objectId<>',
    },
  };
}
