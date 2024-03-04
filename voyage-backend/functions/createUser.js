/**
 * @param {string} name - Username of user
 * @return {string} name - Username of user
 */
function createUser(name) {
  return name;
}

/**
 * Adds the user object to User collection in the database
 *
 * @param {Object} user - Object representing the user
 * @return {Object} user
 */
function addUserToCollection(user) {
  // TO DO
  return user;
}

// Export for App Services use
exports = createUser;

// Export for unit test use
if (typeof module !== 'undefined') {
  module.exports = {
    createUser,
    addUserToCollection,
  };
}
