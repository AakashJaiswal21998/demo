// Handles routes exclusive to admin users (e.g., managing users, accessing special metrics).

import { Request, Response } from "express";
import {
  manageUsers as manageUsersService,
  getAdminMetrics as getAdminMetricsService,
} from "../services/adminService";

export const manageUsers = async (req: Request, res: Response) => {
  try {
    const users = await manageUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getAdminMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await getAdminMetricsService();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
};
