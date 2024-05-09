import Realm, { BSON } from 'realm';

export class Trip extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  tripName!: string;
  tripDestination!: string;
  startDate!: Date;
  endDate!: Date;
  creatorId!: BSON.ObjectId;
  tripMembers!: Realm.Types.Set<BSON.ObjectId>;

  static primaryKey = '_id';
}
