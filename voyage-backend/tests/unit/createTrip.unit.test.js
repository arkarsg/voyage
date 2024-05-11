const { createTrip } = require('../../functions/createTrip');
const { ObjectId } = require('BSON');
const { validTrip, invalidTrip } = require('../constants');

let insertOne;
const dummyUserId = '66117d83879a0b14610e2908'; // eslint-disable-line new-cap

beforeEach(() => {
  insertOne = jest.fn(() => {
    return (result = {
      acknowledged: true,
      insertedId: validTrip._id,
    });
  });

  const collection = jest.fn().mockReturnValue({ insertOne });
  const db = jest.fn().mockReturnValue({ collection });
  const get = jest.fn().mockReturnValue({ db });

  collection.insertOne = insertOne;
  db.collection = collection;
  get.db = db;

  global.context = {
    user: {
      id: dummyUserId,
    },
    services: {
      get,
    },
  };

  objectIdMock = jest.fn(() => {
    return dummyUserId;
  });

  global.BSON = {
    ObjectId: ObjectId,
  };
});

test('Create a valid trip', async () => {
  expect(await createTrip(validTrip)).toStrictEqual({
    success: true,
  });

  expect(context.services.get.db.collection.insertOne).toHaveBeenCalledWith({
    ...validTrip,
    creatorId: new ObjectId(dummyUserId),
    tripMembers: [new ObjectId(dummyUserId)],
  });
});

test('Create invalid trip returns errors', async () => {
  expect(await createTrip(invalidTrip)).toStrictEqual({
    error: {
      invalidTripName: 'Trip name cannot contain special characters',
      invalidEndDate: 'Invalid end date',
      nameTooLong: 'Trip name cannot be longer than 30 characters',
    },
  });
});
