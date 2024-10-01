// Defines routes for the dashboard, accessible after login (e.g., /dashboard, /dashboard/stats).

import { Router } from "express";
import { updateCompanyInfo } from "../controllers/dashboardController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.put("/company-info", authMiddleware, updateCompanyInfo);

export default router;
