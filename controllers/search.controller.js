import { Op } from "sequelize";
import { Publicacion, Usuario, Imagen, Etiqueta } from "../models/index.js"; 

export async function searchPosts(req, res) {
    try {
        const query = req.query.q ? req.query.q.trim() : "";
        const type = req.query.type || "titulo"; // Por defecto busca por título

        if (!query) {
            return req.xhr ? res.json([]) : res.redirect("/");
        }

        let dondeBuscar = {};

        // Aplicamos el filtro condicional según lo que eligió el usuario
        if (type === "titulo") {
            dondeBuscar = {
                [Op.or]: [
                    { titulo: { [Op.like]: `%${query}%` } },
                    { descripcion: { [Op.like]: `%${query}%` } }
                ]
            };
        }

        // Configuración de la consulta de Sequelize
        const opcionesConsulta = {
            include: [
                { model: Usuario, as: "autor" },
                { model: Imagen, as: "imagenes" }
            ]
        };

        // Si elige buscar por etiqueta, hacemos el filtro a través del modelo Etiqueta
        if (type === "etiqueta") {
            opcionesConsulta.include.push({
                model: Etiqueta,
                as: "etiquetas",
                where: { nombre: { [Op.like]: `%${query}%` } } // Filtra por el nombre del tag
            });
        } else {
            // Si busca por título, igual incluimos las etiquetas por si querés mostrarlas pero sin filtrar por ellas
            opcionesConsulta.include.push({ model: Etiqueta, as: "etiquetas", required: false });
        }

        if (type === "titulo") {
            opcionesConsulta.where = dondeBuscar;
        }

        const publicaciones = await Publicacion.findAll(opcionesConsulta);

        
        if (req.xhr) {
            const resultadosFormateados = publicaciones.map(p => ({
                id_publicacion: p.id_publicacion,
                titulo: p.titulo,
                imagenUrl: p.imagenes && p.imagenes.length > 0 ? p.imagenes[0].url : "/img/default.jpg",
                autor: p.autor ? p.autor.username : "Anónimo"
            }));
            return res.json(resultadosFormateados);
        }

        // Si el usuario apretó Enter o el botón "Buscar", renderiza la página normal completa
        res.render("pages/search-results", {
            title: `Resultados para "${query}"`,
            query,
            publicaciones,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.error("ERROR EN BUSCADOR:", error);
        if (req.xhr) return res.status(500).json({ error: "Error interno" });
        res.status(500).render("pages/500", { usuario: req.session?.usuario || null });
    }
}