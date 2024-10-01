// Manages blog-related operations (e.g., creating, reading, updating, deleting blog posts).

import { Request, Response } from "express";
import {
  createBlog as createBlogService,
  getBlogs as getBlogsService,
  getBlogById as getBlogByIdService,
  updateBlog as updateBlogService,
  deleteBlog as deleteBlogService,
} from "../services/blogService";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await createBlogService({
      title: req.body.title,
      content: req.body.content,
      authorId: req.user?.userId,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await getBlogsService();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await getBlogByIdService(parseInt(req.params.id));
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await updateBlogService(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await deleteBlogService(parseInt(req.params.id));
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
