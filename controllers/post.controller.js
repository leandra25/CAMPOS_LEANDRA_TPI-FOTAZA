import { Publicacion } from "../models/Publicacion.js";
import { Imagen } from "../models/Imagen.js";
import { Etiqueta } from "../models/Etiqueta.js";
import { Publicacion_Etiqueta } from "../models/Publicacion_Etiqueta.js";
import { Comentario } from "../models/Comentario.js";
import { Usuario } from "../models/Usuario.js";
import { Licencia } from "../models/Licencia.js";
import { Valoracion } from "../models/Valoracion.js";
import { Op } from "sequelize";


// MUESTRA FORMULARIO

export function renderCreatePost(req, res) {
    res.render("pages/create-post", {
        title: "Crear publicación",
        usuario: req.session.usuario
    });
}


// CREAR PUBLICACIÓN

export async function createPost(req, res) {

    try {
        const {
            titulo,
            descripcion,
            etiquetas,
            imagenes
        } = req.body;

        if (!req.session?.usuario) {
            return res.status(401).send("Debes iniciar sesión");
        }

        const usuarioId = req.session.usuario.id_usuario;

        // CREAR PUBLICACIÓN
   
        const publicacion = await Publicacion.create({
            titulo,
            descripcion,
            id_usuario: usuarioId
        });

        console.log("PUBLICACIÓN OK:", publicacion.id_publicacion);

      
        // IMAGEN (BLOB)
       
        if (imagenes) {

    const listaImagenes = JSON.parse(imagenes);

    const licencia = await Licencia.findByPk(1);

    for (const img of listaImagenes) {

        const base64 = img.base64.split(",")[1];

        const buffer = Buffer.from(
            base64,
            "base64"
        );

        await Imagen.create({
            id_publicacion:
                publicacion.id_publicacion,

            id_licencia:
                licencia ? licencia.id_licencia : 1,

            nombre_archivo:
                img.nombre,

            tipo_mime:
                img.tipoMime,

            datos_imagen:
                buffer
        });
    }
}
   
        // 3. ETIQUETAS

        if (etiquetas) {

            const lista = etiquetas
                .split(",")
                .map(e => e.trim())
                .filter(Boolean);

            for (const nombre of lista) {

                let etiqueta = await Etiqueta.findOne({
                    where: { nombre }
                });

                if (!etiqueta) {
                    etiqueta = await Etiqueta.create({ nombre });
                }

                await Publicacion_Etiqueta.create({
                    id_publicacion: publicacion.id_publicacion,
                    id_etiqueta: etiqueta.id_etiqueta
                });
            }
        }

        return res.redirect("/");

    } catch (error) {
        console.error("ERROR CREATE POST:", error);
        return res.status(500).render("pages/500", {
            usuario: req.session.usuario
        });
    }
}

// IMAGEN

export async function renderImagen(req, res) {

    try {
        const imagen = await Imagen.findByPk(req.params.id);

        if (!imagen) {
            return res.status(404).send("Imagen no encontrada");
        }

        res.set("Content-Type", imagen.tipo_mime);
        res.send(imagen.datos_imagen);

    } catch (error) {
        console.error(error);
        res.status(500).send("Error imagen");
    }
}




// EDIT

export async function renderEditPost(req, res) {
  try {
    const id = req.params.id;

    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).render("pages/404");
    }

    res.render("pages/edit-post", { publicacion });

  } catch (error) {
    console.error(error);
    res.status(500).render("pages/500");
  }
}

// UPDATE
export async function updatePost(req, res) {
  try {
    const id = req.params.id;

    const { titulo, descripcion } = req.body;

    await Publicacion.update(
      { titulo, descripcion },
      { where: { id_publicacion: id } }
    );

    res.redirect("/");

  } catch (error) {
    console.error(error);
    res.status(500).render("pages/500");
  }
}
// DELETE
export async function eliminarPost(req, res) {
  try {
    const id = req.params.id;

    await Publicacion.update(
      { deletedAt: new Date() }, // borrado lógico
      { where: { id_publicacion: id } }
    );

    return res.redirect("/perfil");
  } catch (error) {
    console.error(error);
    return res.status(500).render("pages/500");
  }
}

//DETAIL POST
export async function renderPostDetail(req, res) {
  try {
    const { id } = req.params;

    const publicacion = await Publicacion.findByPk(id, {
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
              include: [{ model: Usuario, as: "usuario" }]
            },
            {
              model: Valoracion,
              as: "valoraciones"
            }
          ]
        }
      ]
    });

    if (!publicacion) {
      return res.status(404).send("Publicación no encontrada");
    }

    res.render("pages/post-detail", {
      title: "Detalle publicación",
      publicacion,
      usuario: req.session.usuario // ✅ ESTE ES EL FIX
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("pages/500");
  }
}

// SEARCH

export async function buscar(req, res) {
    try {
          const texto = (req.query.q || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();

        const publicaciones = await Publicacion.findAll({
            include: [
                { model: Etiqueta, as: "etiquetas" , required: false,
                paranoid: false}
            ]
        });

        const resultados = publicaciones.filter(publicacion => {

            const coincideTitulo =
                (publicacion.titulo || "")
                    .toLowerCase()
                    .includes(texto);

            const coincideDescripcion =
                (publicacion.descripcion || "")
                    .toLowerCase()
                    .includes(texto);

            const coincideEtiqueta =
                publicacion.etiquetas.some(etiqueta =>
                    (etiqueta.nombre || "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .includes(texto)
                );

            return coincideTitulo || coincideDescripcion || coincideEtiqueta;
        });

        console.log("RESULTADOS:", resultados.map(p => p.titulo));

        res.render("pages/search-results", {
            title: "Resultados",
            publicaciones: resultados,
            busqueda: texto,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.error("ERROR BUSCAR:", error);
    }
}