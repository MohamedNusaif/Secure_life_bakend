import { Router } from "express";
import {
  register,
  login,
  getMe,
} from "../controllers/auth.controller";

const router = Router();
import { authenticate } from "../middleware/auth.middleware";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);


export default router;