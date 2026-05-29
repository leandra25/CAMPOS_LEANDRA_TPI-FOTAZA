import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Publicacion extends Model {}

Publicacion.init(
  {
    id_publicacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    estado: {
      type: DataTypes.ENUM(
        "ACTIVA",
        "PENDIENTE_REVISION",
        "BAJADA"
      ),
      allowNull: false,
      defaultValue: "ACTIVA",
    },
  },
  {
    sequelize,
    modelName: "Publicacion",
    tableName: "publicaciones",

    timestamps: true,
    paranoid: true,
  }
);