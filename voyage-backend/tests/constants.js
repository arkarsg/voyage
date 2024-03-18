// Name of database on App Services
const voyageDb = 'dev_voyage_app';

// Collections within the DB
const usersCollection = 'User';

// Valid user stub
const validAtlasUser = {
  username: 'tester',
  email: 'tester@example.com',
  password: 'Passw0rd!',
};

module.exports = {
  voyageDb,
  usersCollection,
  validAtlasUser,
};
