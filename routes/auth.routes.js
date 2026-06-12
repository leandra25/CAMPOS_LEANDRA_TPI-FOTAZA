import { Router } from "express";

import {

    renderRegister,
    register,

    renderLogin,
    login,

    logout

} from "../controllers/auth.controller.js";


// ======================
// ROUTER
// ======================

const router = Router();


// ======================
// REGISTER
// ======================

// mostrar formulario
router.get(
    "/register",
    renderRegister
);

// procesar formulario
router.post(
    "/register",
    register
);


// ======================
// LOGIN
// ======================

// mostrar login
router.get(
    "/login",
    renderLogin
);

// procesar login
router.post(
    "/login",
    login
);


// ======================
// LOGOUT
// ======================

router.get(
    "/logout",
    logout
);


// ======================
// EXPORT
// ======================

export default router;