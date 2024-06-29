async function inviteTripMember(tripId, invitedMemberId) {
  const tripsCollection = context.services
    .get('mongodb-atlas')
    .db('dev_voyage_app')
    .collection('Trip');

  const usersCollection = context.services
    .get('mongodb-atlas')
    .db('dev_voyage_app')
    .collection('Users');

  try {
    // Check if the trip exists
    const trip = await tripsCollection.findOne({ _id: tripId });
    if (!trip) {
      return {
        error: {
          message: 'Trip does not exist.',
        },
      };
    }

    const canInvite = trip && trip.tripMembers.includes(context.user.id);

    if (!canInvite) {
      return {
        error: {
          message:
            'Cannont invite users to trip without belonging to the trip.',
        },
      };
    }

    // Check if the user to be invited exists
    const user = await usersCollection.findOne({ _id: invitedMemberId });
    if (!user) {
      return {
        error: {
          message: 'User does not exist.',
        },
      };
    }

    // Check if the user is already a member of the trip
    const isMember =
      trip.tripMembers && trip.tripMembers.includes(invitedMemberId);
    if (isMember) {
      return {
        error: {
          message: 'User is already a member of the trip.',
        },
      };
    }

    const isAlreadyInvited = user.invites && user.invites.includes(tripId);
    if (isAlreadyInvited) {
      return {
        error: {
          message: 'User is already invited to the trip.',
        },
      };
    }

    // Call system function to invite the member
    const result = await context.functions.execute(
      'addTripToUserInvites',
      tripId,
      invitedMemberId,
    );
    return result;
  } catch (err) {
    console.log('Error occurred:', err.message);
    return {
      error: {
        message: err.message || 'Something went wrong. Please try again.',
      },
    };
  }
}

exports = inviteTripMember;

// Export for unit test use
if (typeof module !== 'undefined') {
  module.exports = {
    inviteTripMember,
  };
}
