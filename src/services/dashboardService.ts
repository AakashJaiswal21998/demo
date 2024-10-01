// Handles operations related to the user dashboard, such as managing user-specific data like company information and RFQs

import prisma from "../prismaClient";

export const updateCompanyInfo = async (
  userId: number,
  data: {
    companyName?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    website?: string;
    federalId?: string;
  }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};
