import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Test = sequelize.define('Test', {
  test: DataTypes.STRING,
});

export default Test;