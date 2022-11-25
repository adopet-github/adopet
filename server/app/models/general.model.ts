import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import { cascade } from "../utils/db";
import Animal from "./animal.model";
import User from "./user.model";
import Image from "./image.model";

const General = sequelize.define('General', {
  description: DataTypes.STRING
});

General.hasOne(User, cascade);
General.hasOne(Animal, cascade);
General.hasMany(Image, cascade);

export default General;