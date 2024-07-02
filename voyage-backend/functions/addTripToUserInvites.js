async function addTripToUserInvites(tripId, invitedTripMemberId) {
  const usersCollection = context.services
    .get('mongodb-atlas')
    .db('dev_voyage_app')
    .collection('User');

  try {
    await usersCollection.updateOne(
      { _id: invitedTripMemberId },
      { $addToSet: { invites: tripId } },
    );

    return {
      success: true,
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
