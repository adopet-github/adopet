import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Location = sequelize.define('location', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  longitude: DataTypes.FLOAT,
  latitude: DataTypes.FLOAT,
  address: DataTypes.STRING
});

export default Location;
