require('dotenv').config();
// eslint-disable-next-line camelcase
const { app_id } = require('../../realm_config.json');
const { BSON } = require('BSON');
const Realm = require('realm');

const {
  voyageDb,
  validAtlasUser,
  integrationValidTrip,
  integrationInvalidTrip,
  tripsCollection,
} = require('../constants');

let tripCollection;
let app;
let atlasUser;

beforeAll(async () => {
  app = new Realm.App(app_id); // eslint-disable-line camelcase
  const credentials = Realm.Credentials.emailPassword(
    validAtlasUser.email,
    validAtlasUser.password,
  );
  atlasUser = await app.logIn(credentials);
  console.log(atlasUser.id);
  const mongodb = app.currentUser.mongoClient('mongodb-atlas');
  tripCollection = mongodb.db(voyageDb).collection(tripsCollection);
});

afterAll(async () => {
  await tripCollection.deleteMany({
    tripName: integrationValidTrip.tripName,
  });
  await app.currentUser.logOut();
});

test('cannot create an invalid trip', async () => {
  expect(
    await atlasUser.functions.createTrip(integrationInvalidTrip),
  ).toStrictEqual({
    error: {
      invalidDates: 'Start date must be before end date',
      invalidTripName: 'Trip name cannot contain special characters',
      nameTooLong: 'Trip name cannot be longer than 30 characters',
    },
  });
});

test('can create a valid trip', async () => {
  expect(
    await atlasUser.functions.createTrip(integrationValidTrip),
  ).toStrictEqual({
    success: true,
  });

  const insertedTrip = await tripCollection.findOne({
    tripName: 'Paris Tour',
  });

  expect(insertedTrip).toBeDefined();
  expect(insertedTrip).toEqual(
    expect.objectContaining({
      ...integrationValidTrip,
      creatorId: new BSON.ObjectId(atlasUser.id),
      tripMembers: [new BSON.ObjectId(atlasUser.id)],
    }),
  );
});
