import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Mensaje extends Model {}

Mensaje.init(
  {
    id_mensaje: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_conversacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    leido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Mensaje",
    tableName: "mensajes",

    timestamps: true,
    paranoid: true,
  }
);