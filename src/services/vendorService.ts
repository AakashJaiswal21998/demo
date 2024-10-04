// Manages vendor-specific operations, such as vendor creation and accessing.

import prisma from "../prismaClient";

export const getAllVendor = async (data: any) => {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: data.name,
      },
      userType: 2,
    },
  });
  return {
    totalUsers: await prisma.user.count(),
    searchUsers: users?.length,
    userList: users,
  };
};
