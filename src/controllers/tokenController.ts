import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Function to encrypt the token
const encrypt = (token: string, encryptionKey: string) => {
  if (encryptionKey.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be exactly 32 characters long");
  }
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(token, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// Function to decrypt the token
const decrypt = (encryptedToken: string, encryptionKey: string) => {
  const [ivHex, encryptedText] = encryptedToken.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

// Function to generate access and refresh tokens
export const generateTokens = (user: { email: string; userType: number }) => {
  const accessToken = jwt.sign(
    { email: user.email, userType: user.userType },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { email: user.email, userType: user.userType },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );

  // Encryption key - should be 32 bytes long for AES-256
  const encryptionKey = process.env.ENCRYPTION_KEY as string;

  // Encrypting the tokens
  const encryptedAccessToken = encrypt(accessToken, encryptionKey);
  const encryptedRefreshToken = encrypt(refreshToken, encryptionKey);

  return {
    accessToken: encryptedAccessToken,
    refreshToken: encryptedRefreshToken,
  };
};

// Middleware to verify access token

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const email = req.headers["email"];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  const encryptionKey = process.env.ENCRYPTION_KEY as string;

  let decryptedAccessToken: any;

  try {
    decryptedAccessToken = decrypt(token, encryptionKey);
  } catch (error) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(
    decryptedAccessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      if (user && user?.email === email && user?.userType) {
        req.user = { email: user?.email, userType: user.userType };
        return next();
      } else {
        res.sendStatus(403);
        return;
      }
    }
  );
};

// Endpoint to refresh access token
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken: providedRefreshToken } = req.body;

  if (!providedRefreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const user = await new Promise<any>((resolve, reject) => {
      jwt.verify(
        providedRefreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, user: any) => {
          if (err) {
            return reject(err); // Reject the promise if there's an error
          }
          resolve(user); // Resolve the promise with the user object
        }
      );
    });

    // Generate new access and refresh tokens
    const newTokens = generateTokens({
      email: user.email,
      userType: user.userType,
    }); // Assuming userType is 0 for now
    return res.json(newTokens); // Return the new tokens
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(403).json({ error: "Invalid refresh token" }); // Handle the case where the refresh token is invalid
  }
};
