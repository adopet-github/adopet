import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  salt: DataTypes.STRING
});

export default User;
