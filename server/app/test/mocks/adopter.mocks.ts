const adopterMocks: {
  validCreateObject: { [key: string]: unknown };
  invalidObject: { [key: string]: unknown };
  validAdopterLogin: object;
  validAdopterLogin2: object;
  validShelterLogin: object;
  validUpdateObject: { [key: string]: unknown };
} = {
  validCreateObject: {
    description: 'lol',
    email: 'ericlorpal9@gmail.com',
    first_name: 'Eric',
    last_name: 'Lorite',
    age: 21,
    house_type: 'apartment',
    has_pets: false,
    has_children: true,
    time_at_home: 3,
    latitude: 2,
    longitude: 4,
    address: 'lol',
    password: 'Lolxd777!'
  },
  invalidObject: {
    description: [],
    email: 'asdo@.com',
    first_name: '2401!',
    last_name: 'del  rio',
    age: 'five',
    house_type: 'invalid house type',
    has_pets: 5,
    has_children: 'yes',
    time_at_home: 'a lot',
    latitude: 'far away',
    longitude: 'far away',
    address: { name: 'hi', number: 5 },
    password: 'lolxd777'
  },

  validAdopterLogin: {
    email: 'ericlorpal11@gmail.com',
    password: 'Lolxd777!'
  },

  validAdopterLogin2: {
    email: 'ericlorpal7@gmail.com',
    password: 'Lolxd777!'
  },

  validShelterLogin: {
    email: 'shelter@test.com',
    password: 'Sheltersecurepassword12'
  },

  validUpdateObject: {
    description: 'lol',
    first_name: 'Eric',
    last_name: 'Lorite',
    age: 21,
    house_type: 'apartment',
    has_pets: false,
    has_children: true,
    time_at_home: 3,
    latitude: 2,
    longitude: 4,
    address: 'lol',
    password: 'Lolxd777!'
  }
};

export default adopterMocks;
