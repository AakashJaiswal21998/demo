// Defines public routes related to blogs (e.g., /blogs, /blogs/:id).

import { Router } from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
