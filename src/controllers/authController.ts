// Handles authentication logic (e.g., login, registration)

import { Request, Response } from "express";
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/authService";
import jwt from "jsonwebtoken";
import { LoginData } from "../types/authTypes";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      success: true,
      message: "User registration successful",
      data: user,
    });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginData = req.body;

  try {
    const user = await loginUserService({ email, password });
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
      error: error.message,
    });
  }
};
