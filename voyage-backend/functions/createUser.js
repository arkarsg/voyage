/*
Access the providers associated with the authEvent:
const providers = authEvent.providers

Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

Access a mongodb service:
const collection = context.services.get("<SERVICE_NAME>").db("<DB_NAME>").collection("<COLL_NAME>");
const doc = collection.findOne({ name: "mongodb" });

Call other named functions if they are defined in your application:
const result = context.functions.execute("function_name", arg1, arg2);

Access the default http client and execute a GET request:
const response = context.http.get({ url: <URL> })

Learn more about http client here: https://www.mongodb.com/docs/atlas/app-services/functions/context/#context-http
*/

/**
 * Adds the user object to User collection in the database
 *
 * @param {Object} user - Object representing the user
 * @return {Object} user
 */
async function addUserToCollection(authEvent) {
  const usersCollection = context.services
    .get('mongodb-atlas')
    .db('dev_voyage_app')
    .collection('User');

  const user = createUser(authEvent.user);
  try {
    return await usersCollection.insertOne(user);
  } catch (err) {
    console.error('Error inserting user:', err.message);
  }
}

/**
 * @param {Object} userObj - User associated with the auth event
 * @return {Object} User document
 */
function createUser(userObj) {
  return {
    _id: BSON.ObjectId(userObj.id),
    email: data.email,
  };
}

// Export for App Services use
exports = addUserToCollection;

// Export for unit test use
if (typeof module !== 'undefined') {
  module.exports = {
    addUserToCollection,
  };
}
