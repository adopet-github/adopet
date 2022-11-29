import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  content: DataTypes.STRING,
  author: DataTypes.ENUM('shelter', 'adopter')
});

export default Message;