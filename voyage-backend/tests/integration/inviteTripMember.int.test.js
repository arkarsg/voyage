require('dotenv').config();
const { app_id } = require('../../realm_config.json');
const { BSON } = require('BSON');
const Realm = require('realm');

const {
  voyageDb,
  validAtlasUser,
  integrationValidTrip,
  tripsCollection,
  usersCollection,
} = require('../constants');

let tripCollection;
let app;
let atlasUser;
let userCollection;

beforeAll(async () => {
  app = new Realm.App({
    id: app_id,
  }); // eslint-disable-line camelcase

  const credentials = Realm.Credentials.emailPassword(
    validAtlasUser.email,
    validAtlasUser.password,
  );
  atlasUser = await app.logIn(credentials);

  atlasUser.functions.createTrip(integrationValidTrip);

  const mongodb = app.currentUser.mongoClient('mongodb-atlas');
  userCollection = mongodb.db(voyageDb).collection(usersCollection);
  tripCollection = mongodb.db(voyageDb).collection(tripsCollection);
});

afterAll(async () => {
  await userCollection.deleteMany({
    email: validAtlasUser.email,
  });
  await tripCollection.deleteMany({
    tripName: integrationValidTrip.tripName,
  });
  await app.deleteUser(atlasUser);
});

test('invite new member to trip', async () => {
  const trip = await tripCollection.findOne({
    tripName: integrationValidTrip.tripName,
  });
  const invitedUser = await userCollection.findOne({
    email: 'tester1@test.com',
  });
  expect(
    await atlasUser.functions.inviteTripMember(
      new BSON.ObjectId(trip._id),
      new BSON.ObjectId(invitedUser._id),
    ),
  ).toStrictEqual({
    success: true,
  });
});
