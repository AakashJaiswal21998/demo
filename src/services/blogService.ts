// Manages all operations related to the blog

import prisma from "../prismaClient";

export const createBlog = async (data: {
  title: string;
  content: string;
  authorId: any;
}) => {
  return prisma.blog.create({
    data,
  });
};

export const getBlogs = async () => {
  return prisma.blog.findMany();
};

export const getBlogById = async (id: number) => {
  return prisma.blog.findUnique({ where: { id } });
};

export const updateBlog = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  return prisma.blog.update({
    where: { id },
    data,
  });
};

export const deleteBlog = async (id: number) => {
  return prisma.blog.delete({
    where: { id },
  });
};
