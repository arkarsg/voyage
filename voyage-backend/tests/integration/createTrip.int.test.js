require('dotenv').config();
// eslint-disable-next-line camelcase
const { app_id } = require('../../realm_config.json');
const { BSON } = require('BSON');
const Realm = require('realm');
const { MongoClient } = require('mongodb');

const {
  voyageDb,
  validAtlasUser,
  integrationValidTrip,
  integrationInvalidTrip,
  tripsCollection,
  usersCollection,
} = require('../constants');

let tripCollection;
let mongoClient;
let app;
let atlasUser;
let userCollection;

beforeAll(async () => {
  app = new Realm.App(app_id); // eslint-disable-line camelcase
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/test?retryWrites=true&w=majority`;
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  tripCollection = mongoClient.db(voyageDb).collection(tripsCollection);
  userCollection = mongoClient.db(voyageDb).collection(usersCollection);

  const credentials = Realm.Credentials.emailPassword(
    validAtlasUser.email,
    validAtlasUser.password,
  );
  atlasUser = await app.logIn(credentials);
});

afterEach(async () => {
  await tripCollection.deleteMany({
    tripName: integrationValidTrip.tripName,
  });
});

afterAll(async () => {
  await userCollection.deleteMany({
    email: validAtlasUser.email,
  });
  await tripCollection.deleteMany({
    tripName: integrationValidTrip.tripName,
  });
  await app.deleteUser(atlasUser);
  await mongoClient.close();
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

  const allTrips = await tripCollection.find({}).toArray((arr, err) => {
    return arr;
  });
  expect(allTrips).toStrictEqual([]);
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
