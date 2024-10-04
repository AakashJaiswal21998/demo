// routes/index.ts
import express from "express";
import authRoutes from "./authRoutes";
import blogRoutes from "./blogRoutes";
import dashboardRoutes from "./dashboardRoutes";
import adminRoutes from "./adminRoutes";
import tokenRoutes from "./tokenRoutes";
import vendorRoutes from "./vendorRoutes";
import contactusRoutes from "./contactusRoutes";

const router = express.Router();

// Use the imported routes
router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/token", tokenRoutes);
router.use("/vendor", vendorRoutes);
router.use("/contact", contactusRoutes);

export default router;
