import { Model, DataTypes } from "sequelize";
import sequelize from "../database.js";

class Website extends Model {}

Website.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device: {
      type: DataTypes.TEXT,
    },
    level: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    image: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Website",
    tableName: "website",
  }
);

export default Website;
