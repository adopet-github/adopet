import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import { cascade } from "../utils/db";
import Animal from "./animal.model";
import User from "./user.model";

const Shelter = sequelize.define('Shelter', {
  name: DataTypes.STRING,
});



export default Shelter;