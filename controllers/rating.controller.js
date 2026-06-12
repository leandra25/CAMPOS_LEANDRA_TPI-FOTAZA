import { Valoracion, Imagen, Publicacion } from "../models/index.js";


export async function valorarImagen(req, res) {
  try {

    const id_imagen = req.params.id;
    const puntaje = Number(req.body.puntaje);
    if (!req.session?.usuario) {
      return res.status(401).send("Debes iniciar sesión");
    }

    //  buscar la imagen con su publicación
    const imagen = await Imagen.findByPk(id_imagen, {
      include: {
        model: Publicacion,
        as: "publicacion"
      }
    });

    if (!imagen) {
      return res.status(404).json({ ok: false });
    }

    // bloquear si es su propia publicación
    if (Number(imagen.publicacion?.id_usuario) === Number(usuarioId)) {
      return res.status(403).json({ ok: false });
    }

    const [valoracion, creada] = await Valoracion.findOrCreate({
      where: {
        id_usuario: usuarioId,
        id_imagen

      },
      defaults: { puntaje }
    });

    if (!creada) {
      await valoracion.update({ puntaje });
    }

    return res.json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }
}