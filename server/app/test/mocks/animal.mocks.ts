const animalMocks: {
  validCreateObject: { [key: string]: unknown };
  invalidObject: { [key: string]: unknown };
  validShelterLogin: object;
  validShelterLogin2: object;
  validAdopterLogin: object;
  validUpdateObject: { [key: string]: unknown };
} = {
  validCreateObject: {
    description: 'dsfaiuheasuiof',
    name: 'sajnisaniods',
    age: 23,
    weight: 3455
  },
  invalidObject: {
    description: [],
    name: [],
    age: 'safxno',
    weight: 'sadge'
  },

  validShelterLogin: {
    email: 'shelter12@test.com',
    password: 'Sheltersecurepassword12'
  },

  validShelterLogin2: {
    email: 'shelter13@test.com',
    password: 'Sheltersecurepassword12'
  },

  validAdopterLogin: {
    email: 'ericlorpal7@gmail.com',
    password: 'Lolxd777!'
  },

  validUpdateObject: {
    description: 'dsfaiuheasuiof',
    name: 'sajnisaniods',
    age: 23,
    weight: 3455
  }
};

export default animalMocks;
