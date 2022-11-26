import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { cascade } from '../utils/db';
import Adopter from './adopter.model';
import Adopter_Animal from './adopter_animal.model';
import General from './general.model';
import Shelter from './shelter.model';

const Animal = sequelize.define('animal', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  weight: DataTypes.INTEGER
});

export default Animal;
