// Defines admin-only routes (e.g., /admin/users, /admin/settings).

import { Router } from "express";
import { manageUsers, getAdminMetrics } from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, manageUsers);
router.get("/metrics", authMiddleware, adminMiddleware, getAdminMetrics);

export default router; // Ensure this default export exists
