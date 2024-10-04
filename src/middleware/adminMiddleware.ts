// // Middleware to restrict access to admin-only routes.

// import { Request, Response, NextFunction } from "express";

// const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user?.userType !== 1) {
//     // Assuming userType 1 is Admin
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// };

// export default adminMiddleware;

import { Request, Response, NextFunction } from "express";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.userType !== 1) {
    res.status(403).json({ error: "Access denied" });
    return; // Ensure function execution stops after sending the response
  }
  next(); // If the user is admin, proceed to the next middleware or route handler
};

export default adminMiddleware;
