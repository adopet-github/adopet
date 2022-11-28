import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

// TODO: MESSAGES TABLE FOR CHAT AND RELATE THE TABLE TO ADOPER_ANIMAL

const Adopter_Animal = sequelize.define('adopter_animal', {
  is_liked: DataTypes.BOOLEAN,
  is_matched: DataTypes.BOOLEAN
});

export default Adopter_Animal;
