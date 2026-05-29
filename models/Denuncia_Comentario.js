import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Denuncia_Comentario extends Model {}

Denuncia_Comentario.init(
  {
    id_denuncia_comentario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_comentario: {
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
    modelName: "Denuncia_Comentario",
    tableName: "denuncias_comentario",

    timestamps: true,
    paranoid: true,
  }
);