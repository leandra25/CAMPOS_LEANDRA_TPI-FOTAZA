import { Usuario, Publicacion } from "../models/index.js";
import { Imagen } from "../models/Imagen.js";
import { Comentario } from "../models/Comentario.js";
import { Seguimiento } from "../models/index.js";
import { Valoracion } from "../models/index.js";

// VER PERFIL

export async function renderProfile(req, res) {
    try {
        if (!req.session || !req.session.usuario) {
            return res.redirect("/auth/login");
        }

        const usuarioId = req.session.usuario.id_usuario;

        // Buscar usuario en DB junto con sus publicaciones
        const perfil = await Usuario.findByPk(usuarioId, {
            include: [
                {
                    model: Publicacion, as: "publicaciones",
                    include: [
                        {
                            model: Imagen, as: "imagenes",
                            include: [{
                                model: Comentario, as: "comentarios",
                                include: [{ model: Usuario, as: "usuario" }

                                ]
                            },
                            {
                                model: Valoracion,
                                as: "valoraciones"
                            }
                        ]
                        }]
                }]
        });
   const seguidoresCount = await Seguimiento.count({
            where: {
                id_seguido: usuarioId
            }
        });

        const siguiendoCount = await Seguimiento.count({
            where: {
                id_seguidor: usuarioId
            }
        });
        if (!perfil) {
            return res.send("Usuario no encontrado en la base de datos");
        }
       

        // Renderizar vista pasando sesión (usuario) y datos de DB (perfil)
        res.render("pages/profile", {
            title: "Mi perfil",
            usuario: req.session.usuario, // Mantiene el Navbar logueado
            perfil: perfil,                // Datos para dibujar la página
            seguidoresCount,
            siguiendoCount

        });

    } catch (error) {
        console.error("ERROR RENDER PROFILE:", error);
        res.status(500).render("pages/500", { usuario: req.session?.usuario || null });
    }
}


// FORM EDITAR PERFIL

export async function renderEditProfile(req, res) {
    try {
        if (!req.session || !req.session.usuario) {
            return res.redirect("/auth/login");
        }

        const usuarioId = req.session.usuario.id_usuario;
        const perfil = await Usuario.findByPk(usuarioId);

        res.render("pages/edit-profile", {
            title: "Editar perfil",
            usuario: req.session.usuario, // Para el Navbar
            perfil: perfil                // Para rellenar los inputs del formulario
        });

    } catch (error) {
        console.error("ERROR RENDER EDIT PROFILE:", error);
        res.status(500).render("pages/500", { usuario: req.session?.usuario || null });
    }
}


// UPDATE PROFILE

export async function updateProfile(req, res) {
    try {
        if (!req.session || !req.session.usuario) {
            return res.redirect("/auth/login");
        }

        const usuarioId = req.session.usuario.id_usuario;
        const { username, email } = req.body;

        const usuarioModel = await Usuario.findByPk(usuarioId);

        if (!usuarioModel) {
            return res.send("Usuario no encontrado");
        }

        // Actualizar campos
        usuarioModel.username = username;
        usuarioModel.email = email;
        await usuarioModel.save();

        // Actualizar sesión por si cambió el username
        req.session.usuario.username = username;

        res.redirect("/perfil");

    } catch (error) {
        console.error("ERROR UPDATE PROFILE:", error);
        res.status(500).render("pages/500", { usuario: req.session?.usuario || null });
    }
}