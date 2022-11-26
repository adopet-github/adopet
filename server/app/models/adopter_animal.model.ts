import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { cascade } from '../utils/db';
import Adopter from './adopter.model';
import Animal from './animal.model';

const Adopter_Animal = sequelize.define('adopter_animal', {
  is_liked: DataTypes.BOOLEAN
});

export default Adopter_Animal;
