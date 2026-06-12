import { Publicacion } from "../models/Publicacion.js";
import { Comentario } from "../models/Comentario.js";
import { Usuario } from "../models/Usuario.js";
import { Imagen } from "../models/Imagen.js";
import { Valoracion } from "../models/Valoracion.js";
import { Op } from "sequelize";

export async function renderHome(req, res) {
    try {
        // Verificación de sesión
        if (!req.session || !req.session.usuario) {
            //Quitamos el objeto. Solo dejamos la URL.
            return res.redirect("/auth/login");
        }

        const miId = req.session.usuario.id_usuario;

        // Buscamos las publicaciones para el Home
        const publicaciones = await Publicacion.findAll({
            include: [
                {
                    model: Usuario,
                    as: "autor"
                },
                {
                    model: Imagen,
                    as: "imagenes",
                    include: [
                        {
                            model: Comentario,
                            as: "comentarios",
                            include: [
                                {
                                    model: Usuario,
                                    as: "usuario"
                                }
                            ]
                        },
                        {
                            model: Valoracion,
                            as: "valoraciones"
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        publicaciones.forEach(publicacion => {
    publicacion.imagenes.forEach(imagen => {
        //const valoraciones = imagen.valoraciones || [];
        const valoracionUsuario = imagen.valoraciones.find(
            v => Number(v.id_usuario) === Number(miId)
        );

        imagen.valoracionUsuario = valoracionUsuario
            ? valoracionUsuario.puntaje
            : 0;
    });
});
        // Buscamos los usuarios usando relación belongsToMany
        const usuariosLista = await Usuario.findAll({
            where: {
                id_usuario: {
                    [Op.ne]: miId // Excluirme a mí mismo
                }
            },
            attributes: ["id_usuario", "username", "firstname", "lastname"],
            include: [
                {
                    model: Usuario,
                    as: "seguidores",
                    where: { id_usuario: miId },
                    required: false,
                    attributes: ["id_usuario"]
                }
            ],
            limit: 20
        });

        // Mapeamos para crear la propiedad virtual .yaLoSigo
        const usuarios = usuariosLista.map(u => {
            const userPlain = u.get({ plain: true });

            userPlain.yaLoSigo = u.seguidores && u.seguidores.length > 0;
            delete userPlain.seguidores;

            return userPlain;
        });

        // Renderiza el Home real pasando los datos procesados
        res.render("pages/home", {
            title: "Fotaza - Inicio",
            publicaciones,
            usuarios,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.error("ERROR EN HOME:", error);
        res.status(500).render("pages/500");
    }
}