// Handles routes exclusive to admin users (e.g., managing users, accessing special metrics).

import { Request, Response } from "express";
import { readFileAsBase64 } from "./../services/multerService";
import { getAllVendor } from "./../services/vendorService";

export const getVendors = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  try {
    const vendors = await getAllVendor(data);

    // Check if vendors?.userList is empty or 0
    if (!vendors?.userList || vendors.userList.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vendors found",
        data: {
          totalUsers: vendors?.totalUsers || 0,
          searchUsers: vendors?.searchUsers || 0,
          userList: [],
        },
      });
      return; // Exit function after sending the response
    }

    const sanitizedUserList = await Promise.all(
      vendors?.userList?.map(async (user: any) => {
        const { id, password, createdAt, federalId, ...userDataToSend } = user;

        let profileImageBase64: string | null = null;

        // Read the profile image as a base64 string
        if (userDataToSend?.profileImage) {
          const userFolder = "users";
          profileImageBase64 = await readFileAsBase64(
            userFolder,
            userDataToSend?.profileImage
          );
        }

        return {
          ...userDataToSend,
          profileImage: profileImageBase64,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Vendors fetched successfully",
      data: {
        totalUsers: vendors?.totalUsers,
        searchUsers: vendors?.searchUsers,
        userList: sanitizedUserList,
      },
    });
  } catch (error: any) {
    console.error("Error fetching vendors:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vendors",
      error: error.message,
    });
  }
};
