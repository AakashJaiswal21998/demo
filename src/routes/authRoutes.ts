// Defines routes for authentication (e.g., /login, /register).

import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { uploadFile } from "./../services/multerService";

const router = Router();

router.post("/register", uploadFile("users", "profileImage"), registerUser);
router.post("/login", loginUser);

export default router;
