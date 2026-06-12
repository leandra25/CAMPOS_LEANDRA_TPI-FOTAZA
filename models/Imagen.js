import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Imagen extends Model { }

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

    id_licencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Nombre original del archivo
    nombre_archivo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    tipo_mime: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    datos_imagen: {
      type: DataTypes.BLOB,
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