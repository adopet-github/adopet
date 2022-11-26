import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Image = sequelize.define('image', {
  caption: {
    type: DataTypes.STRING(32),
    defaultValue: ''
  },
  url: DataTypes.STRING
});

export default Image;
