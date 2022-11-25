import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Animal = sequelize.define('Animal', {
  name: DataTypes.STRING,
  age: DataTypes.TINYINT,
  weight: DataTypes.TINYINT
});

export default Animal;