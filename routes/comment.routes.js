import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();


router.post("/crear", isAuthenticated, createComment);

export default router;