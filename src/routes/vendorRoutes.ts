// Defines admin-only routes (e.g., /admin/users, /admin/settings).

import { Router } from "express";
import { verifyToken } from "./../controllers/tokenController";
import { getVendors } from "./../controllers/vendorController";

const router = Router();

router.post("/vendor-list", verifyToken, getVendors);

export default router;
