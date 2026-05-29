import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Notificacion extends Model {}

Notificacion.init(
  {
    id_notificacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_usuario_destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario_origen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tipo: {
      type: DataTypes.ENUM(
        "COMENTARIO",
        "VALORACION",
        "FOLLOW",
        "ME_INTERESA"
      ),
      allowNull: false,
    },

    id_referencia: { //Guarda el id relacionado con el evento.
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    leida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Notificacion",
    tableName: "notificaciones",

    timestamps: true,
    paranoid: true,
  }
);