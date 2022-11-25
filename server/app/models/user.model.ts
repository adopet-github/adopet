import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone_number: DataTypes.STRING
});

export default User;