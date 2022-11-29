import { relationships } from "../models";

const includes: {[key: string]: object} = {
  adopter: [
    {
      association: relationships.adopter.user,
      include: [
        {
          association: relationships.user.general,
          include: [relationships.general.images]
        },
        relationships.user.location
      ]
    },
    relationships.adopter.animals
  ],
  animal: [
    {
      association: relationships.animal.general,
      include: [relationships.general.images]
    },
    relationships.animal.shelter,
    relationships.animal.adopters
  ],
  shelter: [
    {
      association: relationships.shelter.user,
      include: [
        {
          association: relationships.user.general,
          include: [relationships.general.images]
        },
        relationships.user.location
      ]
    },
    relationships.shelter.animals
  ]
};

export default includes;