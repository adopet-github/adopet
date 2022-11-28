import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const User = sequelize.define('user', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone_number: DataTypes.STRING
});

export default User;
