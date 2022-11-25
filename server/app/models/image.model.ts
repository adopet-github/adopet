import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import { cascade } from "../utils/db";
import General from "./general.model";

const Image = sequelize.define('Image', {
  caption: {
    type: DataTypes.STRING(32),
    defaultValue: ''
  },
  url: DataTypes.STRING
});

Image.belongsTo(General, cascade);

export default Image;