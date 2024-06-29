async function addTripToUserInvites(tripId, invitedTripMemberId) {
  const usersCollection = context.services
    .get('mongodb-atlas')
    .db('dev_voyage_app')
    .collection('Users');

  try {
    await usersCollection.updateOne(
      { _id: invitedTripMemberId },
      { $addToSet: { invites: tripId } },
    );

    return {
      message: 'Trip invite added successfully.',
    };
  } catch (err) {
    console.log('Error occurred while updating user invites:', err.message);
    return {
      error: {
        message: err.message || 'Something went wrong. Please try again.',
      },
    };
  }
}

exports = addTripToUserInvites;

if (typeof module !== 'undefined') {
  module.exports = {
    addTripToUserInvites,
  };
}
