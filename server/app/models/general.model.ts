import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const General = sequelize.define('general', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  description: DataTypes.STRING
});

export default General;
