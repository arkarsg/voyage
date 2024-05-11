// Name of database on App Services
const voyageDb = 'dev_voyage_app';

// Collections within the DB
const usersCollection = 'User';
const tripsCollection = 'Trip';

// Valid user stub
const validAtlasUser = {
  username: 'tester',
  email: 'tester@example.com',
  password: 'Passw0rd!',
};

const integrationValidTrip = {
  tripName: 'Paris Tour',
  tripDestination: {
    name: 'Paris',
    country: 'France',
    lat: 1.0,
    long: -56.0,
  },
  startDate: new Date('01-01-2024'),
  endDate: new Date('01-01-2024'),
};

const integrationInvalidTrip = {
  tripName:
    '0; var date=new Date(); do{curDate = new Date();}while(curDate-date<10000)',
  tripDestination: {
    name: 'Paris',
  },
  startDate: new Date('12-12-2024'),
  endDate: new Date('01-01-2024'),
};

const validTrip = {
  _id: 'dummy_Paris_id', // eslint-disable-line new-cap
  tripName: 'Paris Tour',
  tripDestination: 'Paris, France',
  startDate: new Date('01-01-2024'),
  endDate: new Date('01-01-2024'),
};

const invalidTrip = {
  _id: 'dummy_invalid_id',
  tripName:
    '0; var date=new Date(); do{curDate = new Date();}while(curDate-date<10000)',
  tripDestination: 'NoSQL injection checks $ne',
  startDate: new Date('12-12-2024'),
  endDate: new Date('invalid date'),
};

module.exports = {
  voyageDb,
  usersCollection,
  tripsCollection,
  validAtlasUser,
  integrationValidTrip,
  integrationInvalidTrip,
  validTrip,
  invalidTrip,
};
