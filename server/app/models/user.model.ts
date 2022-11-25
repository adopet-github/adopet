import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import { cascade } from "../utils/db";
import Adopter from "./adopter.model";
import General from "./general.model";
import Location from "./location.model";
import Shelter from "./shelter.model";

const User = sequelize.define('User', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone_number: DataTypes.STRING
});

User.belongsTo(General, cascade);
User.hasOne(Location, cascade);
User.hasOne(Shelter, cascade);
User.hasOne(Adopter, cascade);

export default User;