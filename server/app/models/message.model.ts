import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

const Message = sequelize.define('message', {
  content: DataTypes.STRING,
  author: DataTypes.ENUM('shelter', 'adopter')
});

export default Message;
