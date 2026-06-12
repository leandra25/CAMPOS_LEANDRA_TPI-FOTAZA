// ===============================
// IMPORTACIONES
// ===============================
import sequelize from "./config.js"; // conexión a PostgreSQL mediante Sequelize

import { seedRoles } from '../seeders/roles.seed.js';
import { seedLicencias } from "../seeders/licencias.seed.js";

// importación de todos los modelos
import { Rol } from "./Rol.js";
import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { Licencia } from "./Licencia.js";
import { Imagen } from "./Imagen.js";
import { Etiqueta } from "./Etiqueta.js";
import { Publicacion_Etiqueta } from "./Publicacion_Etiqueta.js";
import { Comentario } from "./Comentario.js";
import { Valoracion } from "./Valoracion.js";
import { Seguimiento } from "./Seguimiento.js";
import { Denuncia_Imagen } from "./Denuncia_Imagen.js";
import { Denuncia_Comentario } from "./Denuncia_Comentario.js";
import { Notificacion } from "./Notificacion.js";
import { Interes } from "./Interes.js";
import { Mensajeria } from "./Mensajeria.js";
import { Mensaje } from "./Mensaje.js";
import { Coleccion } from "./Coleccion.js";
import { Coleccion_Publicacion } from "./Coleccion_Publicacion.js";


// ======================================================
// RELACIÓN ROL - USUARIO (1:N)
// Un rol puede tener muchos usuarios
// Un usuario pertenece a un rol
// ======================================================

// un rol tiene muchos usuarios
Rol.hasMany(Usuario, {
  foreignKey: "id_rol",// FK en tabla usuarios
  as: "usuarios", // alias para consultas
}); 

// un usuario pertenece a un rol
Usuario.belongsTo(Rol, {
  foreignKey: "id_rol",
  as: "rol",
});


// ======================================================
// RELACIÓN USUARIO - PUBLICACION (1:N)
// Un usuario puede crear muchas publicaciones
// Una publicación pertenece a un usuario
// ======================================================

Usuario.hasMany(Publicacion, {
  foreignKey: "id_usuario",
  as: "publicaciones",
});

Publicacion.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "autor",
});


// ======================================================
// RELACIÓN PUBLICACION - IMAGEN (1:N)
// Una publicación puede tener muchas imágenes
// Una imagen pertenece a una publicación
// ======================================================

Publicacion.hasMany(Imagen, {
  foreignKey: "id_publicacion",
  as: "imagenes",
});

Imagen.belongsTo(Publicacion, {
  foreignKey: "id_publicacion",
  as: "publicacion",
});


// ======================================================
// RELACIÓN LICENCIA - IMAGEN (1:N)
// Una licencia puede aplicarse a muchas imágenes
// Una imagen tiene una sola licencia
// ======================================================

Licencia.hasMany(Imagen, {
  foreignKey: "id_licencia",
  as: "imagenes",
});

Imagen.belongsTo(Licencia, {
  foreignKey: "id_licencia",
  as: "licencia",
});


// ======================================================
// RELACIÓN PUBLICACION - ETIQUETA (N:N)
// Una publicación puede tener muchas etiquetas
// Una etiqueta puede pertenecer a muchas publicaciones
// Se usa tabla intermedia: Publicacion_Etiqueta
// ======================================================

Publicacion.belongsToMany(Etiqueta, {
  through: Publicacion_Etiqueta, // tabla puente
  foreignKey: "id_publicacion",
  otherKey: "id_etiqueta",
  as: "etiquetas",
});

Etiqueta.belongsToMany(Publicacion, {
  through: Publicacion_Etiqueta,
  foreignKey: "id_etiqueta",
  otherKey: "id_publicacion",
  as: "publicaciones",
});


// ======================================================
// RELACIÓN IMAGEN - COMENTARIO (1:N)
// Una imagen puede tener muchos comentarios
// Un comentario pertenece a una imagen
// ======================================================

Imagen.hasMany(Comentario, {
  foreignKey: "id_imagen",
  as: "comentarios",
});

Comentario.belongsTo(Imagen, {
  foreignKey: "id_imagen",
  as: "imagen",
});

// ======================================================
// RELACIÓN USUARIO - COMENTARIO (1:N)
// Un usuario puede hacer muchos comentarios
// Un comentario pertenece a un usuario
// ======================================================

Usuario.hasMany(Comentario, {
  foreignKey: "id_usuario",
  as: "comentarios",
});

Comentario.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});


// ======================================================
// RELACIÓN IMAGEN - VALORACION (1:N)
// Una imagen puede recibir muchas valoraciones
// Una valoración pertenece a una imagen
// ======================================================

Imagen.hasMany(Valoracion, {
  foreignKey: "id_imagen",
  as: "valoraciones",
});

Valoracion.belongsTo(Imagen, {
  foreignKey: "id_imagen",
  as: "imagen",
});

// ======================================================
// RELACIÓN USUARIO - VALORACION (1:N)
// Un usuario puede valorar muchas imágenes
// Una valoración pertenece a un usuario
// ======================================================

Usuario.hasMany(Valoracion, {
  foreignKey: "id_usuario",
  as: "valoraciones",
});

Valoracion.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});


// ======================================================
// RELACIÓN USUARIO - USUARIO (N:N)
// SISTEMA DE SEGUIDORES
// Autorelación:
// usuario sigue usuario
// ======================================================

Usuario.belongsToMany(Usuario, {
  through: Seguimiento, // tabla intermedia
  as: "seguidos", // usuarios que sigo
  foreignKey: "id_seguidor",
  otherKey: "id_seguido",
});

Usuario.belongsToMany(Usuario, {
  through: Seguimiento,
  as: "seguidores", // usuarios que me siguen
  foreignKey: "id_seguido",
  otherKey: "id_seguidor",
});


// ======================================================
// RELACIÓN IMAGEN - DENUNCIA_IMAGEN (1:N)
// Una imagen puede recibir muchas denuncias
// ======================================================

Imagen.hasMany(Denuncia_Imagen, {
  foreignKey: "id_imagen",
  as: "denuncias",
});

Denuncia_Imagen.belongsTo(Imagen, {
  foreignKey: "id_imagen",
  as: "imagen",
});

// usuario que realizó la denuncia
Usuario.hasMany(Denuncia_Imagen, {
  foreignKey: "id_usuario",
  as: "denuncias_imagen",
});

Denuncia_Imagen.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});


// ======================================================
// RELACIÓN COMENTARIO - DENUNCIA_COMENTARIO (1:N)
// ======================================================

Comentario.hasMany(Denuncia_Comentario, {
  foreignKey: "id_comentario",
  as: "denuncias",
});

Denuncia_Comentario.belongsTo(Comentario, {
  foreignKey: "id_comentario",
  as: "comentario",
});
// usuario que realizó la denuncia
Usuario.hasMany(Denuncia_Comentario, {
  foreignKey: "id_usuario",
  as: "denuncias_comentario",
});

Denuncia_Comentario.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});

// ======================================================
// RELACIÓN USUARIO - NOTIFICACION (1:N)
// Un usuario recibe muchas notificaciones
// =======================================================

Usuario.hasMany(Notificacion, {
  foreignKey: "id_usuario_destino",
  as: "notificaciones",
});

// usuario destinatario
Notificacion.belongsTo(Usuario, {
  foreignKey: "id_usuario_destino",
  as: "destinatario",
});

// usuario que originó la acción
Notificacion.belongsTo(Usuario, {
  foreignKey: "id_usuario_origen",
  as: "origen",
});


// ======================================================
// RELACIÓN IMAGEN - INTERES (1:N)
// ======================================================

Imagen.hasMany(Interes, {
  foreignKey: "id_imagen",
  as: "intereses",
});

Interes.belongsTo(Imagen, {
  foreignKey: "id_imagen",
  as: "imagen",
});

// usuario interesado
Usuario.hasMany(Interes, {
  foreignKey: "id_usuario_interesado",
  as: "intereses",
});

Interes.belongsTo(Usuario, {
  foreignKey: "id_usuario_interesado",
  as: "usuario",
});

// ======================================================
// RELACIÓN MENSAJERIA (chat privado)
// Una mensajería conecta dos usuarios
// ======================================================

// usuario iniciador
Usuario.hasMany(Mensajeria, {
  foreignKey: "id_usuario1",
  as: "mensajerias_iniciadas",
});

// usuario receptor
Usuario.hasMany(Mensajeria, {
  foreignKey: "id_usuario2",
  as: "mensajeria_recibidas",
});

Mensajeria.belongsTo(Usuario, {
  foreignKey: "id_usuario1",
  as: "usuario1",
});

Mensajeria.belongsTo(Usuario, {
  foreignKey: "id_usuario2",
  as: "usuario2",
});


// ======================================================
// RELACIÓN MENSAJERIA - MENSAJE (1:N)
// Una conversación tiene muchos mensajes
// ======================================================

Mensajeria.hasMany(Mensaje, {
  foreignKey: "id_mensajeria",
  as: "mensajes",
});

Mensaje.belongsTo(Mensajeria, {
  foreignKey: "id_mensajeria",
  as: "mensajeria",
});

// usuario emisor del mensaje
Usuario.hasMany(Mensaje, {
  foreignKey: "id_usuario",
  as: "mensajes",
});

Mensaje.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});


// ======================================================
// RELACIÓN USUARIO - COLECCION (1:N)
// Un usuario puede crear muchas colecciones
// ======================================================

Usuario.hasMany(Coleccion, {
  foreignKey: "id_usuario",
  as: "colecciones",
});

Coleccion.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});


// ======================================================
// RELACIÓN COLECCION - PUBLICACION (N:N)
// Una colección tiene muchas publicaciones
// Una publicación puede estar en varias colecciones
// ======================================================

Coleccion.belongsToMany(Publicacion, {
  through: Coleccion_Publicacion,
  foreignKey: "id_coleccion",
  otherKey: "id_publicacion",
  as: "publicaciones",
});

Publicacion.belongsToMany(Coleccion, {
  through: Coleccion_Publicacion,
  foreignKey: "id_publicacion",
  otherKey: "id_coleccion",
  as: "colecciones",
});


// ======================================================
// EXPORTACIÓN DE MODELOS
// Permite usarlos desde controllers, rutas, etc.
// ======================================================

export {
  sequelize,
  Rol,
  Usuario,
  Publicacion,
  Licencia,
  Imagen,
  Etiqueta,
  Publicacion_Etiqueta,
  Comentario,
  Valoracion,
  Seguimiento,
  Denuncia_Imagen,
  Denuncia_Comentario,
  Notificacion,
  Interes,
  Mensajeria,
  Mensaje,
  Coleccion,
  Coleccion_Publicacion,
  
};

// ======================================================
// FUNCIÓN DE CONEXIÓN A BASE DE DATOS
// ======================================================

export async function connectDatabase() {
    try{
       // prueba la conexión a PostgreSQL
    await sequelize.authenticate(); // testear la conexion
    console.log('conexion a dase de datos establecida')
    
    // sincroniza modelos con PostgreSQL
    // crea tablas si no existen
    // force:true elimina y recrea todo
    //alter: true intenta actualizar la estructura sin borrar todo.
    await sequelize.sync({alter:true});
    await seedRoles();
    await seedLicencias();
    console.log('sincronizando modelos')
    }catch(error){
        console.log('Error en la conexion a la base de datos', error)
        throw error


    }
    
}