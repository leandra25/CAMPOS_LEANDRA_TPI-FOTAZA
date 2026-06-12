import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Rol extends Model {}

Rol.init(
  {
    id_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "roles",

    timestamps: true,
    paranoid: true,
  }
);