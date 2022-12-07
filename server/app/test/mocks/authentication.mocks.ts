const authenticationMocks = {
  nonExistingUserLogin: {
    email: 'nonexistinguser@test.com',
    password: 'IdontExistLol12'
  },
  nonValidMessage: 'Email or password not correct',
  verifyIncorrectObject: {
    email: 'ericlorpal11@gmail.com',
    password: 'Lolxd777',
    first_name: 'Eric',
    last_name: 'Lorite'
  },
  verifyCorrectObject: {
    email: 'test@test.com',
    password: 'Lolxd777',
    first_name: 'Eric',
    last_name: 'Lorite'
  }
};

export default authenticationMocks;
