import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Coleccion_Publicacion extends Model {}

Coleccion_Publicacion.init(
  {
    id_coleccion_publicacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_coleccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Coleccion_Publicacion",
    tableName: "coleccion_publicacion",

    timestamps: true, //Agrega automáticamente:createdAt,updatedAt
    paranoid: true,

    indexes: [
      {
        unique: true,
        fields: [
          "id_coleccion",
          "id_publicacion",
        ],
      },
    ],
  }
);