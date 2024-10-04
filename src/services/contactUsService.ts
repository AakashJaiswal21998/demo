import prisma from "../prismaClient";
import { ContactFormData } from "./../types/contactus";

export const contactus = async (data: ContactFormData) => {
  return prisma.contact.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      reason: data.reason,
      message: data.message,
    },
  });
};

export const getContactQuote = async () => {
  const contactQuote = await prisma.contact.findMany();

  return {
    totalContactQuote: await prisma.contact.count(),
    searchContactQuote: contactQuote?.length,
    contactQuote: contactQuote,
  };
};
