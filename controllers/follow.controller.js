import { Seguimiento } from "../models/Seguimiento.js";

export async function followUser(req, res) {
    try {
        const id_seguidor = parseInt(req.session.usuario.id_usuario);
        const id_seguido = parseInt(req.params.id);

        if (id_seguidor === id_seguido) {
            return res.status(400).json({
                error: "No puedes seguirte a ti mismo"
            });
        }

        // Busca también registros eliminados (soft delete)
        const seguimiento = await Seguimiento.findOne({
            where: {
                id_seguidor,
                id_seguido
            },
            paranoid: false
        });

        // Si existe y NO está eliminado
        if (seguimiento && !seguimiento.deletedAt) {
            return res.status(200).json({
                ok: true,
                mensaje: "Ya sigues a este usuario"
            });
        }

        // Si existe pero fue eliminado, lo restauramos
        if (seguimiento && seguimiento.deletedAt) {
            await seguimiento.restore();

            return res.status(200).json({
                ok: true,
                mensaje: "Seguimiento restaurado correctamente"
            });
        }

        // Si no existe, lo creamos
        await Seguimiento.create({
            id_seguidor,
            id_seguido
        });

        return res.status(200).json({
            ok: true,
            mensaje: "Usuario seguido con éxito"
        });

    } catch (error) {
        console.error("ERROR AL SEGUIR USUARIO:", error);

        return res.status(500).json({
            error: "No se pudo procesar el seguimiento"
        });
    }
}

export async function unfollowUser(req, res) {
    try {
        const id_seguidor = parseInt(req.session.usuario.id_usuario);
        const id_seguido = parseInt(req.params.id);

        await Seguimiento.destroy({
            where: {
                id_seguidor,
                id_seguido
            }
        });
   

        return res.status(200).json({
            ok: true,
            mensaje: "Has dejado de seguir al usuario"
        });

    } catch (error) {
        console.error("ERROR AL DEJAR DE SEGUIR USUARIO:", error);

        return res.status(500).json({
            error: "No se pudo cancelar el seguimiento"
        });
    }
}