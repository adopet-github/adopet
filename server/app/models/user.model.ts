import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

export default User;
