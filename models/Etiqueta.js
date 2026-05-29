import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Etiqueta extends Model {}

Etiqueta.init(
  {
    id_etiqueta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Etiqueta",
    tableName: "etiquetas",

    timestamps: true,
    paranoid: true,
  }
);