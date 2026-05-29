import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Valoracion extends Model {}

Valoracion.init(
  {
    id_valoracion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_imagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    puntaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: "Valoracion",
    tableName: "valoraciones",

    timestamps: true,
    paranoid: true,

    indexes: [  //la combinación de esos dos campos no puede repetirse , un usuario no vote varias veces la misma imagen
      {
        unique: true,
        fields: ["id_usuario", "id_imagen"],
      },
    ],
  }
);