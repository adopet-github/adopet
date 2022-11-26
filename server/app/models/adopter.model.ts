import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

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
