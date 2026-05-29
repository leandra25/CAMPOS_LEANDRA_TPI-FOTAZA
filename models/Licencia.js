import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Licencia extends Model {}

Licencia.init(
  {
    id_licencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Licencia",
    tableName: "licencias",

    timestamps: true,
    paranoid: true,
  }
);