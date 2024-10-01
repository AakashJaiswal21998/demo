// Middleware to restrict access to admin-only routes.

import { Request, Response, NextFunction } from "express";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 1) {
    // Assuming userType 1 is Admin
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

export default adminMiddleware;
