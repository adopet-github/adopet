import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { cascade } from '../utils/db';
import Adopter_Animal from './adopter_animal.model';
import Animal from './animal.model';
import User from './user.model';

const Adopter = sequelize.define('adopter', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  house_type: DataTypes.ENUM('apartment', 'villa', 'house', 'townhouse'),
  has_pets: DataTypes.BOOLEAN,
  has_children: DataTypes.BOOLEAN,
  time_at_home: DataTypes.INTEGER
});

export default Adopter;
