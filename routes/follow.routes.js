import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/:id", isAuthenticated, followUser);
router.post("/unfollow/:id", isAuthenticated, unfollowUser);

export default router;