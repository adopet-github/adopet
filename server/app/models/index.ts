// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Adopter_Animal from './adopter_animal.model';
import Adopter from './adopter.model';
import Animal from './animal.model';
import General from './general.model';
import Image from './image.model';
import Location from './location.model';
import Shelter from './shelter.model';
import User from './user.model';
import { cascade } from '../utils/db';

export default {
  Adopter_Animal,
  Adopter,
  Animal,
  General,
  Image,
  Location,
  Shelter,
  User
};

export const relationships = {
  user: {
    general: User.belongsTo(General, cascade),
    location: User.hasOne(Location, cascade),
    shelter: User.hasOne(Shelter, cascade),
    adopter: User.hasOne(Adopter, cascade)
  },
  general: {
    user: General.hasOne(User, cascade),
    animal: General.hasOne(Animal, cascade),
    images: General.hasMany(Image, cascade)
  },
  shelter: {
    user: Shelter.belongsTo(User, cascade),
    animals: Shelter.hasMany(Animal, cascade)
  },
  location: {
    user: Location.belongsTo(User, cascade)
  },
  image: {
    general: Image.belongsTo(General, cascade)
  },
  animal: {
    shelter: Animal.belongsTo(Shelter, cascade),
    general: Animal.belongsTo(General, cascade),
    adopters: Animal.belongsToMany(Adopter, { ...cascade, through: Adopter_Animal })
  },
  adopter: {
    user: Adopter.belongsTo(User, cascade),
    animals: Adopter.belongsToMany(Animal, { ...cascade, through: Adopter_Animal })
  }
};
