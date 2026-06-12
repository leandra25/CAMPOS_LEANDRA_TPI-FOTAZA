import express from "express";
import { renderHome } from "../controllers/home.controller.js";

const router = express.Router();

// Llama directamente a la función del controlador
router.get("/", renderHome);

export default router;