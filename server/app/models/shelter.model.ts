import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Shelter = sequelize.define('shelter', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: DataTypes.STRING
});

export default Shelter;
