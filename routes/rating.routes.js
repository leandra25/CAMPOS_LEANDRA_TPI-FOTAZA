import { Router } from "express";
import { valorarImagen } from "../controllers/rating.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:id", isAuthenticated, valorarImagen);

export default router;