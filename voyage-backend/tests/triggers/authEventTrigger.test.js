require('dotenv').config();
// eslint-disable-next-line camelcase
const { app_id } = require('../../realm_config.json');
const Realm = require('realm');
const { MongoClient } = require('mongodb');

const { voyageDb, usersCollection, validAtlasUser } = require('../constants');

let atlasUser;
let mongoClient;
let app;
let dbCollection;

beforeAll(async () => {
  app = new Realm.App(app_id); // eslint-disable-line camelcase
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/test?retryWrites=true&w=majority`;
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  dbCollection = mongoClient.db(voyageDb).collection(usersCollection);
});

afterAll(async () => {
  await dbCollection.deleteMany({
    email: 'dummyUser@dummy.com',
  });
  await mongoClient.close();
});

/**
 * Clean up function
 * Removes the user from User collection and delete the user from the app
 */
afterEach(async () => {
  await app.deleteUser(atlasUser);
});

test('emailPassword creates a user in User collection', async () => {
  await app.emailPasswordAuth.registerUser({
    email: 'dummyUser@dummy.com',
    password: '12345678',
  });

  const credentials = Realm.Credentials.emailPassword(
    'dummyUser@dummy.com',
    '12345678',
  );

  atlasUser = await app.logIn(credentials);

  const insertedUser = await dbCollection.findOne({
    email: 'dummyUser@dummy.com',
  });

  // Check that the Trigger creates a User in the User collection
  expect(insertedUser.email).toBe('dummyUser@dummy.com');
});
