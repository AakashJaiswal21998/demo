// Handles routes related to the user dashboard (e.g., user-specific data).

import { Request, Response } from "express";
import { updateCompanyInfo as updateCompanyInfoService } from "../services/dashboardService";

export const updateCompanyInfo = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  try {
    const updatedCompany = await updateCompanyInfoService(userId, req.body);
    res.json({
      message: "Company information updated successfully",
      updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update company information" });
  }
};
