// Defines routes for token.

import { Router } from "express";
import { refreshToken } from "./../controllers/tokenController";

const router = Router();

router.post("/refresh-token", refreshToken);

export default router;
