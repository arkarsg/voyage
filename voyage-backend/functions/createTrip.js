const MAX_TRIP_NAME_CHARS = 30;

/**
 * @param {Object} trip - trip object
 * @return {void}
 */
async function createTrip(trip) {
  const tripsCollection = context.services
      .get('mongodb-atlas')
      .db('dev_voyage_app')
      .collection('Trip');
  const creatorId = context.user.id;

  const validationErrors = validateTrip(trip);

  if (Object.keys(validationErrors).length === 0) {
    try {
      const newTrip = {
        _id: new BSON.ObjectId(),
        ...trip,
        creatorId: new BSON.ObjectId(creatorId),
        tripMembers: [new BSON.ObjectId(creatorId)],
      };
      await tripsCollection.insertOne(newTrip);
      return { success: true };
    } catch (err) {
      return {
        error: {
          message: err.message || 'Something went wrong. Please try again.',
        },
      };
    }
  } else {
    return {
      error: {
        ...validationErrors,
      },
    };
  }
}

/**
 * @param {Object} trip - Trip
 * @return {Array} array of validation errors, if any
 */
function validateTrip({ tripName, startDate, endDate }) {
  const nameErrors = validateTripName(tripName);
  const dateErrors = validateDates(startDate, endDate);

  return {
    ...nameErrors,
    ...dateErrors,
  };
}

/**
 * @param {String} tripName
 * @return {Object} Errors
 */
function validateTripName(tripName) {
  let tripNameErrors = {};
  if (containsIllegalCharacters(tripName)) {
    tripNameErrors = {
      ...tripNameErrors,
      invalidTripName: 'Trip name cannot contain special characters',
    };
  }

  if (tripName.length > MAX_TRIP_NAME_CHARS) {
    tripNameErrors = {
      ...tripNameErrors,
      nameTooLong: 'Trip name cannot be longer than 30 characters',
    };
  }
  return tripNameErrors;
}

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {Object} errors
 */
function validateDates(startDate, endDate) {
  let dateErrors = {};
  if (isNaN(startDate)) {
    dateErrors = {
      ...dateErrors,
      invalidStartDate: 'Invalid start date',
    };
  }

  if (isNaN(endDate)) {
    dateErrors = {
      ...dateErrors,
      invalidEndDate: 'Invalid end date',
    };
  }

  if (startDate > endDate) {
    dateErrors = {
      ...dateErrors,
      invalidDates: 'Start date must be before end date',
    };
  }

  return dateErrors;
}

/**
 * Checks if contains any illegal characters for NoSQL injections
 * Illegal characters: $, <, >, ;, {, }
 * @param {String} str - any field of type string
 * @return {Boolean} `true` if `str` does contains illegal characters,
 * `false` otherwise
 */
function containsIllegalCharacters(str) {
  return str.match(/[$<>;{}]/) !== null;
}

exports = createTrip;
// Export for unit test use
if (typeof module !== 'undefined') {
  module.exports = {
    createTrip,
  };
}
