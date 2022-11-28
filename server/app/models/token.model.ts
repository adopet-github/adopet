import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Token = sequelize.define('token', {
  content: DataTypes.STRING
});

export default Token;