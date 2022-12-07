const imageMocks: {
  [key: string]: unknown;
  validCreateArray1: { images: unknown[] };
  validCreateArray2: { images: unknown[] };
  validCreateArray3: { images: unknown[] };
  validCreateArray4: { images: unknown[] };
  validCreateArray5: { images: unknown[] };
  invalidCreateArray1: { images: unknown[] };
  invalidCreateArray2: { images: unknown[] };
  invalidCreateArray3: { images: unknown[] };
  invalidCreateArray4: { images: unknown[] };
  invalidCreateArray5: { images: unknown[] };
  validShelterLogin: object;
  validShelterLogin2: object;
  validAdopterLogin: object;
  validAdopterLogin2: object;
  validAnimal: object;
} = {
  validCreateArray1: {
    images: [
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      }
    ]
  },
  validCreateArray2: {
    images: [
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      }
    ]
  },
  validCreateArray3: {
    images: [
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      }
    ]
  },
  validCreateArray4: {
    images: [
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      }
    ]
  },
  validCreateArray5: {
    images: [
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      },
      {
        caption: 'lol',
        url: 'https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol'
      }
    ]
  },
  invalidCreateArray1: {
    images: [
      {
        caption: ['lol'],
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol']
      }
    ]
  },
  invalidCreateArray2: {
    images: [
      {
        caption: 'lol',
        url: 'lol'
      },
      {
        caption: 'lol',
        url: 'xd'
      }
    ]
  },
  invalidCreateArray3: {
    images: [
      {
        caption: 'lol',
        url: ['https://regexr.com/']
      },
      {
        caption: 'lol',
        url: 'dsafsdaf'
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/uploads/xdlol']
      }
    ]
  },
  invalidCreateArray4: {
    images: [
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/']
      }
    ]
  },
  invalidCreateArray5: {
    images: [
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol&&&']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol%%']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol···']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol"""']
      },
      {
        caption: 'lol',
        url: ['https://res.cloudinary.com/dyi6bn4vh/image/upload/xdlol!!!!']
      }
    ]
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

  validAdopterLogin2: {
    email: 'ericlorpal11@gmail.com',
    password: 'Lolxd777!'
  },

  validAnimal: {
    description: 'dsfaiuheasuiof',
    name: 'sajnisaniods',
    age: 23,
    weight: 3455
  }
};

export default imageMocks;
