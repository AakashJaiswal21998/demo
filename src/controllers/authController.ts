// Handles authentication logic (e.g., login, registration)

import { Request, Response } from "express";
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/authService";
import jwt from "jsonwebtoken";
import { LoginData, RegisterFormData, UserData } from "../types/authTypes";
import { readFileAsBase64 } from "./../services/multerService";
import { generateTokens } from "./tokenController";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const profileImage = req.file ? req.file.path : null;
    const userData: RegisterFormData = {
      ...req.body,
      profileImage,
      userType: parseInt(req?.body?.userType),
      shippingSameAsAbove: JSON.parse(req?.body?.shippingSameAsAbove),
    };
    const user = await registerUserService(userData);

    let profileImageBase64: string | null = null;
    const { id, password, createdAt, federalId, ...userDataToSend } = user;

    // Read the profile image as a base64 string
    if (userDataToSend?.profileImage) {
      profileImageBase64 = await readFileAsBase64(
        "users",
        userDataToSend?.profileImage
      );
    }

    res.status(201).json({
      success: true,
      message: "User registration successful",
      data: {
        ...userDataToSend,
        profileImage: profileImageBase64,
      },
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

  const data = {
    email,
    password,
  };

  try {
    const user = await loginUserService(data);
    const token = generateTokens(user);

    const { id, password, createdAt, federalId, ...userDataToSend } = user;

    let profileImageBase64: string | null = null;

    // Read the profile image as a base64 string
    if (userDataToSend?.profileImage) {
      const userFolder = "users";
      profileImageBase64 = await readFileAsBase64(
        userFolder,
        userDataToSend?.profileImage
      );
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          ...userDataToSend,
          profileImage: profileImageBase64,
        },
      },
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
