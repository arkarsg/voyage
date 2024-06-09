require('dotenv').config();
// eslint-disable-next-line camelcase
const { app_id } = require('../../realm_config.json');
const { BSON } = require('BSON');
const Realm = require('realm');
const { MongoClient } = require('mongodb');

const {
  voyageDb,
  integrationValidTrip,
  tripsCollection,
} = require('../constants');

let tripCollection;
let mongoClient;
let app;
let atlasUser;

beforeAll(async () => {
  app = new Realm.App(app_id); // eslint-disable-line camelcase
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/test?retryWrites=true&w=majority`;
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  tripCollection = mongoClient.db(voyageDb).collection(tripsCollection);

  const credentials = Realm.Credentials.emailPassword(
    'tester1@test.com',
    '12345678',
  );
  atlasUser = await app.logIn(credentials);
  await atlasUser.functions.createTrip(integrationValidTrip);
});

afterAll(async () => {
  await tripCollection.deleteMany({
    tripName: integrationValidTrip.tripName,
  });
  await mongoClient.close();
});

test('creator can read own trip', async () => {
  const trip = await tripCollection.findOne({
    tripName: integrationValidTrip.tripName,
  });
  expect(trip).toBeDefined();
  expect(trip).toEqual(
    expect.objectContaining({
      ...integrationValidTrip,
    }),
  );
});
