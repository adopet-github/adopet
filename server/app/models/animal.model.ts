import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import { cascade } from "../utils/db";
import Adopter from "./adopter.model";
import Adopter_Animal from "./adopter_animal.model";
import General from "./general.model";
import Shelter from "./shelter.model";

const Animal = sequelize.define('Animal', {
  name: DataTypes.STRING,
  age: DataTypes.TINYINT,
  weight: DataTypes.TINYINT
});

Animal.belongsTo(Shelter, cascade);
Animal.belongsTo(General, cascade);
Animal.belongsToMany(Adopter, { ...cascade, through: Adopter_Animal});

export default Animal;