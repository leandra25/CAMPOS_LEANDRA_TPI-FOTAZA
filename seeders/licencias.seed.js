// seeders/licencias.seed.js

import { Licencia } from "../models/Licencia.js";

export async function seedLicencias() {

    await Licencia.findOrCreate({
        where: { nombre: "Copyright" },
        defaults: {
            descripcion: "Todos los derechos reservados"
        }
    });

    await Licencia.findOrCreate({
        where: { nombre: "Creative Commons" },
        defaults: {
            descripcion: "Licencia Creative Commons"
        }
    });

}