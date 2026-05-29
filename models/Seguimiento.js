import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Seguimiento extends Model {}

Seguimiento.init(
  {
    id_seguimiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_seguidor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_seguido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Seguimiento",
    tableName: "seguidores",

    timestamps: true,
    paranoid: true,

    indexes: [ // un usuario no puede seguir dos veces al mismo usuario.
      {
        unique: true,
        fields: [
          "id_seguidor",
          "id_seguido",
        ],
      },
    ],
    validate: { // evita que un susario se siga asi mismo
      validarSeguidor() {
        if (
          this.id_seguidor ===
          this.id_seguido
        ) {
          throw new Error(
            "Un usuario no puede seguirse a sí mismo"
          );
        }
      },
    },
  }
);