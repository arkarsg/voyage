// eslint-disable-next-line camelcase
const { app_id } = require('../../../realm_config.json');
const Realm = require('realm');

const { sleep } = require('../../testUtils');
const { voyageDb, usersCollection, validUser } = require('../../constants');

let user;
const app = new Realm.App(app_id); // eslint-disable-line camelcase

/**
 * Clean up function
 * Removes the user from User collection and delete the user from the app
 */
afterEach(async () => {
  const db = user.mongoClient('mongodb-atlas').db(voyageDb);
  await db.collection(usersCollection).deleteMany({});
  await app.deleteUser(user);
});

test('Auth trigger creates a user in User collection', async () => {
  await app.emailPasswordAuth.registerUser({
    email: validUser.email,
    password: validUser.password,
  });

  const credentials = Realm.Credentials.emailPassword(
    validUser.email,
    validUser.password,
  );

  user = await app.logIn(credentials);

  // Give time for the Trigger to execute on Atlas
  await sleep(1000);

  const allUsers = user
    .mongoClient('mongodb-atlas')
    .db(voyageDb)
    .collection(usersCollection);

  const insertedUser = await allUsers.findOne({
    email: validUser.email,
  });

  // Check that the Trigger creates a User in the User collection
  expect(insertedUser.email).toBe(validUser.email);
});
