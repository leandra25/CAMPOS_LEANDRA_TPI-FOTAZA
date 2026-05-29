import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Publicacion_Etiqueta extends Model {}

Publicacion_Etiqueta.init(
  {
    id_publicacion_etiqueta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_etiqueta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Publicacion_Etiqueta",
    tableName: "publicacion_etiquetas",

    timestamps: true,
    paranoid: true,

    indexes: [
      {
        unique: true,
        fields: [
          "id_publicacion",
          "id_etiqueta",
        ],
      },
    ],
  }
);