import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Adopter_Animal = sequelize.define('adopter_animal', {
  is_liked: DataTypes.BOOLEAN,
  is_matched: DataTypes.BOOLEAN
});

export default Adopter_Animal;
