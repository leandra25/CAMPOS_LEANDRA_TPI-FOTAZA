import { Router } from "express";


import {
    renderCreatePost,
    createPost,
    renderImagen,
    renderEditPost,
    updatePost,
    eliminarPost,
    renderPostDetail,
    buscar
} from "../controllers/post.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/buscar", buscar);
// ======================================================
// CREAR PUBLICACIÓN
// ======================================================

// Mostrar formulario
router.get(
    "/crear",
    isAuthenticated,
    renderCreatePost
);

// Procesar formulario
router.post(
    "/crear",
    isAuthenticated,
    createPost
);

// ======================================================
// MOSTRAR IMAGEN GUARDADA EN LA BD
// ======================================================



router.get(
    "/imagen/:id",
    renderImagen
);

// ======================================================
// EDITAR PUBLICACIÓN
// ======================================================

router.get("/editar/:id", renderEditPost);

// ======================================================
// ELIMINAR PUBLICACIÓN
// ======================================================

router.post("/eliminar/:id", eliminarPost);

// ======================================================
// DETALLE  PUBLICACIÓN
// ======================================================
router.get("/:id", renderPostDetail);


export default router;