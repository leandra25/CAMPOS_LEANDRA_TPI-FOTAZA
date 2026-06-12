import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

export async function seedUsers() {
  try {
    const users = [
      {
        username: "leandro",
        email: "leandro@test.com",
        password: "123456",
        firstname: "Leandro",
        lastname: "Lopez",
        id_rol: 1,
      },
      {
        username: "juanperez",
        email: "juan@test.com",
        password: "123456",
        firstname: "Juan",
        lastname: "Pérez",
        id_rol: 1,
      },
      {
        username: "maria",
        email: "maria@test.com",
        password: "123456",
        firstname: "María",
        lastname: "Gómez",
        id_rol: 1,
      },
      {
        username: "carlos",
        email: "carlos@test.com",
        password: "123456",
        firstname: "Carlos",
        lastname: "López",
        id_rol: 1,
      },
      {
        username: "sofia",
        email: "sofia@test.com",
        password: "123456",
        firstname: "Sofía",
        lastname: "Martínez",
        id_rol: 1,
      },
    ];

    for (const user of users) {
      const password_hash = await bcrypt.hash(user.password, 10);

      await Usuario.findOrCreate({
        where: { email: user.email },
        defaults: {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          id_rol: user.id_rol,
          password_hash,
        },
      });
    }

    console.log(" 5 usuarios insertados correctamente");
  } catch (error) {
    console.error(" Error en seeder de usuarios:", error);
  }
}