import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { cascade } from '../utils/db';
import User from './user.model';

const Location = sequelize.define('location', {
  longitude: DataTypes.FLOAT,
  latitude: DataTypes.FLOAT,
  address: DataTypes.STRING
});

export default Location;
