import { Model, DataTypes, STRING } from 'sequelize';
import sequelize from './config.js';


export class Usuario extends Model { }

Usuario.init(
  {
    id_usuario: {  //PK del usuario.
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false, //No puede venir vacío.
      unique: true, //Evita duplicados
      validate: { //el username no puede estar vacío y debe tener entre 3 y 50 caracteres.
        notEmpty: true,
        len: [3, 50], 
      },
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, //Evita duplicados
      validate: {
        isEmail: true, //Sequelize verifica formato válido.
      },
    },

    password_hash: { //Se guarda hash (bcrypt).
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    estado_cuenta: {
      type: DataTypes.ENUM(
        "ACTIVA",
        "INACTIVA",
        "SUSPENDIDA"
      ),
      allowNull: false,
      defaultValue: "ACTIVA",
    },

    id_rol: { //FK lógica
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // necesario para conectarse a la bd
    modelName: "Usuario", //nombre del modelo
    tableName: "usuarios", // nombre de la tabla en la base de datos

    timestamps: true, //Agrega automáticamente:createdAt,updatedAt
    paranoid: true, //Activa borrado lógico.
  }
);