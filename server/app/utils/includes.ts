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
    }
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
    {
      association: relationships.shelter.animals,
      include: [
        {
          association: relationships.animal.general,
          include: [relationships.general.images]
        },
        relationships.animal.shelter,
        relationships.animal.adopters
      ],
    }
  ]
};

export default includes;