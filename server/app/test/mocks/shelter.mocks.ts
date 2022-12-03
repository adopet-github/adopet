const shelterMocks: {
  validCreateObject: { [key: string]: unknown };
  invalidObject: { [key: string]: unknown };
  validLogin: object;
  validLogin2: object;
  validNonModelLogin: object;
  validUpdateObject: { [key: string]: unknown };
} = {
  validCreateObject: {
    description: 'lol',
    email: 'shelter11@test.com',
    password: 'Sheltersecurepassword12',
    name: 'shelterify',
    latitude: 2,
    longitude: 4,
    address: 'lol'
  },
  invalidObject: {
    description: [],
    email: 'asdo@.com',
    password: 'lolxd777',
    name: {},
    latitude: 'lol',
    longitude: 'xd',
    address: []
  },

  validLogin: {
    email: 'shelter12@test.com',
    password: 'Sheltersecurepassword12'
  },

  validLogin2: {
    email: 'shelter13@test.com',
    password: 'Sheltersecurepassword12'
  },

  validNonModelLogin: {
    email: 'ericlorpal7@gmail.com',
    password: 'Lolxd777!'
  },

  validUpdateObject: {
    description: 'lol',
    password: 'Sheltersecurepassword12',
    name: 'shelterify',
    latitude: 2,
    longitude: 4,
    address: 'lol'
  }
};

export default shelterMocks;
