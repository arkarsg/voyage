require('dotenv').config();
// eslint-disable-next-line camelcase
const { app_id } = require('../../../realm_config.json');
const Realm = require('realm');
const { MongoClient } = require('mongodb');

const { voyageDb, usersCollection, validUser } = require('../../constants');

let user;
let mongoClient;
let app;
let dbCollection;

beforeAll(async () => {
  jest.setTimeout(10000);
  app = new Realm.App(app_id); // eslint-disable-line camelcase
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/test?retryWrites=true&w=majority`;
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  dbCollection = mongoClient.db(voyageDb).collection(usersCollection);
});

afterAll(async () => {
  await mongoClient.close();
});

/**
 * Clean up function
 * Removes the user from User collection and delete the user from the app
 */
afterEach(async () => {
  await dbCollection.deleteMany({});
  await app.deleteUser(user);
});

test('emailPassword trigger creates a user in User collection', async () => {
  await app.emailPasswordAuth.registerUser({
    email: validUser.email,
    password: validUser.password,
  });

  const credentials = Realm.Credentials.emailPassword(
    validUser.email,
    validUser.password,
  );

  user = await app.logIn(credentials);

  const insertedUser = await dbCollection.findOne({
    email: validUser.email,
  });

  // Check that the Trigger creates a User in the User collection
  expect(insertedUser.email).toBe(validUser.email);
});
