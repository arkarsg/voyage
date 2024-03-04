const { createUser } = require('../../../functions/createUser');

test('should create user', () => {
  const newUser = createUser('Bob');
  expect(newUser).toBe('Bob');
});
