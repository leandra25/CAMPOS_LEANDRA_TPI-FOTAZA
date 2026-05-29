import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Interes extends Model {}

Interes.init(
  {
    id_interes: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_imagen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario_interesado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Interes",
    tableName: "intereses",

    timestamps: true,
    paranoid: true,

    indexes: [
      {
        unique: true,
        fields: [
          "id_imagen",
          "id_usuario_interesado",
        ],
      },
    ],
  }
);
