import {sequelize} from "../models/index.js";
import { Rol } from "../models/Rol.js";

export const seedRoles = async () => {
  const count = await Rol.count();

  if (count === 0) {
    await Rol.bulkCreate([
      { id: 1, nombre: "usuario" },
      { id: 2, nombre: "admin" },
      { id: 3, nombre: "validador" },
    ]);
  }
};