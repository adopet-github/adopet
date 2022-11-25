import { DataTypes } from "sequelize";
import sequelize from "../db/db";

const Adopter_Animal = sequelize.define('Adopter_Animal', {
  is_liked: DataTypes.BOOLEAN
});

export default Adopter_Animal;