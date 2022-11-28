import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const User = sequelize.define('user', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  salt: DataTypes.STRING
});

export default User;
