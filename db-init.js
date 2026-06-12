import sequelize from './models/config.js'; // Tu archivo de configuración existente
import './models/index.js'; // Carga los modelos y sus asociaciones
import { seedRoles } from './seeders/seeder.js';

async function initDatabase() {
  try {
    console.log('Conectando a la base de datos para inicialización...');
    // Fuerza la creación de tablas (borra lo anterior para pruebas limpias)

    await sequelize.authenticate();
    console.log("Conexión a DB OK");

    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas correctamente.');

    // Ejecutamos tus seeders obligatorios
    await seedRoles();
    console.log('Roles y datos de prueba inicializados con éxito.');

    process.exit(0);
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    process.exit(1);
  }
}

initDatabase();