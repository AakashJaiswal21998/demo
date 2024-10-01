// Handles all authentication-related operations.

import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { RegisterFormData, LoginData } from "../types/authTypes";

export const registerUser = async (data: RegisterFormData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      userType: data.userType,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      state: data.state,
      province: data.province,
      countryOption: data.countryOption,
      country: data.country,
      zip: data.zip,
      phone: data.phone,
      fax: data.fax,
      website: data.website,
      federalId: data.federalId,
      businessType: data.businessType,
      otherInformation: data.otherInformation,
      shippingSameAsAbove: data.shippingSameAsAbove,
      shippingAddress: data.shippingAddress,
      shippingType: data.shippingType,
    },
  });
};

export const loginUser = async (data: LoginData) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  console.log("userwesf", user);
  if (user && (await bcrypt.compare(data.password, user.password))) {
    return user;
  }
  throw new Error("Invalid credentials");
};
