import { Includeable } from 'sequelize';
import { relationships } from '../models';

const includes: { [key: string]: Includeable[] } = {
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
    {
      association: relationships.animal.shelter,
      include: [
        {
          association: relationships.shelter.user,
          include: [relationships.user.general]
        }
      ]
    },
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
        {
          association: relationships.animal.shelter,
          include: [
            {
              association: relationships.shelter.user,
              include: [relationships.user.general]
            }
          ]
        },
        relationships.animal.shelter,
        relationships.animal.adopters
      ]
    }
  ]
};

export default includes;
