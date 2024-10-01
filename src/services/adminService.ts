// Manages admin-specific operations, such as blog creation and accessing metrics.

import prisma from "../prismaClient";

export const manageUsers = async () => {
  return prisma.user.findMany();
};

export const getAdminMetrics = async () => {
  // Custom logic to fetch admin-specific metrics
  return {
    totalUsers: await prisma.user.count(),
    activeUsers: await prisma.user.count({ where: { userType: 1 } }), // Example metric
  };
};
