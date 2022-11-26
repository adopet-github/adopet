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

User.belongsTo(General, cascade);
User.hasOne(Location, cascade);
User.hasOne(Shelter, cascade);
User.Adopter = User.hasOne(Adopter, cascade);

Shelter.belongsTo(User, cascade);
Shelter.hasMany(Animal, cascade);

Location.belongsTo(User, cascade);

Image.belongsTo(General, cascade);

General.User = General.hasOne(User, cascade);
General.hasOne(Animal, cascade);
General.hasMany(Image, cascade);

Animal.belongsTo(Shelter, cascade);
Animal.belongsTo(General, cascade);
Animal.belongsToMany(Adopter, { ...cascade, through: Adopter_Animal });

Adopter.belongsTo(User, cascade);
Adopter.belongsToMany(Animal, { ...cascade, through: Adopter_Animal });

Adopter_Animal.hasMany(Adopter, cascade);
Adopter_Animal.hasMany(Animal, cascade);

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
    user: General.hasOne(User, cascade)
  }
};
