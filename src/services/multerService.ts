import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

// Define storage for the uploaded files
const storage = (userFolder: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `uploads/${userFolder}`; // User-specific directory

      // Check if the directory exists; if not, create it
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir); // Pass null for error and the directory
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Extract file extension
      const fileName = `${file.fieldname}-${Date.now()}${ext}`; // Create a unique file name
      cb(null, fileName); // Pass null for error and the filename
    },
  });
};

// File filter to allow only specific file types
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed.")
    );
  }
};

// Common multer configuration function
export const uploadFile = (userFolder: string, fieldName: string) => {
  return multer({
    storage: storage(userFolder),
    limits: {
      fileSize: 1024 * 1024 * 50,
    },
    fileFilter: fileFilter,
  }).single(fieldName);
};

export const readFileAsBase64 = async (
  userFolder: string,
  fileName: string
): Promise<string | null> => {
  try {
    const parentDir = path.dirname(__dirname);

    const grandParent = path.dirname(parentDir);

    const fullPath = path.join(grandParent, fileName);

    const imageExists = fs.existsSync(fullPath);

    if (imageExists) {
      const imageBuffer = fs.readFileSync(fullPath);
      return imageBuffer.toString("base64");
    } else {
      console.error(`File does not exist: ${fullPath}`);
      return null;
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};
