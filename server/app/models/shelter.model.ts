import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Shelter = sequelize.define('Shelter', {
  name: DataTypes.STRING,
});

export default Shelter;