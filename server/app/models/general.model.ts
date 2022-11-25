import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const General = sequelize.define('General', {
  description: DataTypes.STRING
});

export default General;