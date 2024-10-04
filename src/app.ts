import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization", "email"], // Allowed headers
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Use the consolidated routes
app.use("/api", routes);

// Root route
app.get("/", (req: Request, res: Response) => {
  console.log("Hi, API is working...");
  res.send("API is running...");
});

// Start the server on port 4000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
