import { Valoracion ,Imagen,Publicacion } from "../models/index.js";


export async function valorarImagen(req, res) {
  try {

    const id_imagen = req.params.id;
    const puntaje  = Number(req.body.puntaje);
    const usuarioId = req.session.usuario.id_usuario;

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
    if (imagen.publicacion.id_usuario === usuarioId) {
      return res.status(403).json();
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