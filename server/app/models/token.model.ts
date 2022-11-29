import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Token = sequelize.define('token', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  content: DataTypes.STRING
});

export default Token;