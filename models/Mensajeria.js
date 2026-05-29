import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Mensajeria extends Model {}

Mensajeria.init(
  {
    id_mensajeria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_usuario1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mensajeria",
    tableName: "mensajerias",

    timestamps: true,
    paranoid: true,
  }
);