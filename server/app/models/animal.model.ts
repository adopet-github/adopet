import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Animal = sequelize.define('animal', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  weight: DataTypes.INTEGER
});

export default Animal;
