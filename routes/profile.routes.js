import express from "express";

const router = express.Router();

import {

    renderProfile,
    renderEditProfile,
    updateProfile

}
from "../controllers/profile.controller.js";

import {
    isAuthenticated
}
from "../middlewares/auth.middleware.js";


// ver perfil
router.get(
    "/",
    isAuthenticated,
    renderProfile
);


// editar perfil
router.get(
    "/editar",
    isAuthenticated,
    renderEditProfile
);


// actualizar perfil
router.post(
    "/editar",
    isAuthenticated,
    updateProfile
);

export default router;