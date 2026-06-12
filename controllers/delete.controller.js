import { Publicacion } from "../models/Publicacion.js";

export async function eliminarPost(req, res) {
  try {
    const id = req.params.id;

    await Publicacion.destroy({
      where: { id_publicacion: id }
    });

    res.redirect("/perfil"); // o home

  } catch (error) {
    console.error(error);
    res.status(500).render("pages/500");
  }
}