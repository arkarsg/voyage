import Realm, { BSON } from 'realm';
import type TripDestination from './TripDestination';

export class Trip extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  tripName!: string;
  startDate!: Date;
  endDate!: Date;
  tripDestination!: { type: 'object'; objectType: TripDestination };
  creatorId!: BSON.ObjectId;
  tripMembers!: Realm.Set<BSON.ObjectId>;

  static primaryKey = '_id';
}
