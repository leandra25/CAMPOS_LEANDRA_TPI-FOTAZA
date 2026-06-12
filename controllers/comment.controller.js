import { Comentario } from "../models/Comentario.js";


export async function createComment(req, res) {
  try {

    const { id_imagen, id_publicacion, contenido } = req.body;

    if (!req.session?.usuario) {
      return res.status(401).send("Debes iniciar sesión");
    }

    if (!id_imagen || !contenido) {
      return res.status(400).send("Datos incompletos");
    }

    await Comentario.create({
      id_imagen,
      id_usuario: req.session.usuario.id_usuario,
      contenido
    });

    return res.redirect(`/publicaciones/${id_publicacion}`);

  } catch (error) {
    console.error("ERROR COMENTARIO:", error);
    return res.status(500).send("Error al crear comentario.");
  }
}