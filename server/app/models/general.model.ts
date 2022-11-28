import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const General = sequelize.define('general', {
  description: DataTypes.STRING
});

export default General;
