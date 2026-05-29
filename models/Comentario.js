import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Comentario extends Model {}

Comentario.init(
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_imagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Comentario",
    tableName: "comentarios",

    timestamps: true,
    paranoid: true,
  }
);