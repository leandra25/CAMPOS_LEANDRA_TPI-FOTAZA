import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Denuncia_Imagen extends Model {}

Denuncia_Imagen.init(
  {
    id_denuncia_imagen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_imagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    motivo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    estado: {
      type: DataTypes.ENUM(
        "PENDIENTE",
        "ACEPTADA",
        "RECHAZADA"
      ),
      defaultValue: "PENDIENTE",
    },
  },
  {
    sequelize,
    modelName: "Denuncia_Imagen",
    tableName: "denuncias_imagen",

    timestamps: true,
    paranoid: true,
  }
);