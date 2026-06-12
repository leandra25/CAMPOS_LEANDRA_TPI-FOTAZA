// routes/search.routes.js
import express from "express";
import { buscar } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", buscar);

export default router;