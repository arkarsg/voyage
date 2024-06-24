function inviteTripMember(tripId, tripMemberId) {
  // if user is not a member of trip, then return error
  // if tripMember does not exist, return error
  // if tripMember is already in the trip, return error
  // else, call system inviteTripMember function
  //
  // Why do we need to call system function?
  // We want to use Realm's context to get user data that called the function
  // If we run this function as system to directly invite trip members, we will
  // not have info of who sent the invite.
  return { tripId, tripMemberId };
}

exports = inviteTripMember;
// Export for unit test use
if (typeof module !== 'undefined') {
  module.exports = {
    inviteTripMember,
  };
}
