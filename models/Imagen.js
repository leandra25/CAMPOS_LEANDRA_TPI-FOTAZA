import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Imagen extends Model {}

Imagen.init(
  {
    id_imagen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    licencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ruta_imagen: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    copyright: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    marca_agua_texto: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    comentarios_habilitados: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Imagen",
    tableName: "imagenes",

    timestamps: true,
    paranoid: true,
  }
);