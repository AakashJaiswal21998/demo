import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import adminRoutes from "./routes/adminRoutes";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

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
