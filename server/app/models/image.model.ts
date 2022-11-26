import { DataTypes } from 'sequelize';
import sequelize from '../db/db';
import { cascade } from '../utils/db';
import General from './general.model';

const Image = sequelize.define('image', {
  caption: {
    type: DataTypes.STRING(32),
    defaultValue: ''
  },
  url: DataTypes.STRING
});

export default Image;
